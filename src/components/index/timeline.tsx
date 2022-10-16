import * as React from "react"

import timelineData from "../../data/timeline"

import * as styles from "./timeline.module.scss"

export default function Timeline() {
  const now = React.useMemo(() => new Date(), [])

  function getDate(date: string, now = new Date()) {
    if (date === "now")
      return now
    return new Date(date)
  }

  const timelineItems = React.useMemo(() => timelineData.map(item => {
    const timeline = item.timeline.map(({ from, to, hoursPerDay }) => ({
      from: getDate(from, now),
      to: getDate(to, now),
      hoursPerDay,
      active: to === "now"
    }))

    const hours = Math.round(timeline.map(({ from, to, hoursPerDay }) =>
      (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000) * hoursPerDay
    ).reduce((a, b) => a + b))
    const roundedHours = hours - hours % Math.pow(10, Math.floor(Math.log10(hours)))

    return {
      key: item.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/(^-?[^a-z]|^-|-$)/g, ""),
      ...item,
      hours,
      roundedHours,
      timeline
    }
  }), [timelineData, now])

  const years = React.useMemo(() => {
    const minDate = Math.min(...timelineItems.map(item =>
      Math.min(...item.timeline.map(({ from }) => from.getTime()))
    ))

    const minYear = new Date(minDate).getFullYear()
    let maxYear = now.getFullYear()
    if ((maxYear - minYear) % 2 !== 0)
      --maxYear

    return [minYear, (minYear + maxYear) / 2, maxYear]
  }, [timelineItems, now])

  function getDateOffset(date: Date) {
    const min = new Date(years[0], 0, 1)
    const max = new Date(years[years.length - 1] + years[1] - years[0], 0, 0)
    return (date.getTime() - min.getTime()) / (max.getTime() - min.getTime())
  }

  function formatDate(date: Date) {
    return date.toLocaleString("en-US", { dateStyle: "medium" })
  }

  function getTimeline(timeline: any[], key: string) {
    const activeOffset = getDateOffset(now)
    const activeKeyframes = `timeline-appear-${key}-active`

    return (
      <>
        <td key={`${key}-desktop`} colSpan={years.length} className={styles.timelineDesktop}>
          {timeline.map(({ from, to, active }) => {
            const left = getDateOffset(from)
            const right = getDateOffset(to)
            const keyframesName = `timeline-appear-${key}-${from.getTime()}`

            return <>
              <style>{`
                @keyframes ${keyframesName} {
                  0%              { right: ${(1 - left) * 100}%; }
                  ${left * 100}%  { right: ${(1 - left) * 100}%; }
                  ${right * 100}% { right: ${(1 - right) * 100}%; }
                  100%            { right: ${(1 - right) * 100}%; }
                }
              `}</style>
              <div className={active ? styles.active : undefined} style={{
                left: `${left * 100}%`,
                right: `${(1 - right) * 100}%`,
                animation: `${keyframesName} 1s linear forwards`
              }} title={
                active
                  ? `Since ${formatDate(from)}`
                  : `From ${formatDate(from)} to ${formatDate(to)}`
              }></div>
            </>
          })}

          {timeline.some(({ active }) => active) && <>
            <style>{`
              @keyframes ${activeKeyframes} {
                0%                     { width: 0em; }
                ${activeOffset * 100}% { width: 0em; }
                100%                   { right: 0.25em; }
              }
            `}</style>
            <div className={styles.activeCap} style={{
              left: `${activeOffset * 100}%`,
              width: 4,
              animation: `${activeKeyframes} 1s linear forwards`
            }}></div>
          </>}
        </td>

        <td key={`${key}-mobile`} colSpan={years.length} className={styles.timelineMobile}>
          {new Date(Math.min(...timeline.map(({ from }) => from.getTime()))).getFullYear()}
          {" - "}
          {timeline.some(({ active }) => active)
            ? "now"
            : new Date(Math.max(...timeline.map(({ from }) => from.getTime()))).getFullYear()
          }
        </td>
      </>
    )
  }

  function getTableData(item: any) {
    return (
      <>
        <td>
          <h3>{item.name}</h3>
        </td>
        <td className={styles.spacing}></td>
        {getTimeline(item.timeline, item.key)}
        <td className={styles.spacingMobile}></td>
        <td>
          <span title={`${item.hours.toLocaleString("en-US")} hours (approx.)`}>
            {item.roundedHours.toLocaleString("en-US")}+<span className={styles.hoursMobile}> hours</span>
          </span>
        </td>
      </>
    )
  }

  const tableData = React.useMemo<{ item: any, td: JSX.Element }[]>(() => timelineItems.map(item => ({
    item,
    td: getTableData(item)
  })), [timelineItems, years, now])

  return (
    <table className={styles.timeline}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {years.map(year =>
            <th key={year} className={styles.legend}><span>{year}</span></th>
          )}
          <th></th>
          <th>Hours invested</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h2>I do</h2>
          </td>
          {tableData[0].td}
        </tr>
        {tableData.slice(1).map(({ item, td }) =>
          <tr key={item.key}>
            <td></td>
            {td}
          </tr>
        )}
      </tbody>
    </table>
  )
}
