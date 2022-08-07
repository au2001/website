import * as React from "react"

import timelineData from "/src/data/timeline.tsx"

import * as styles from "./timeline.module.scss"

export default function Timeline() {
  const now = React.useMemo(() => new Date(), [])

  function getDate(date, now=new Date()) {
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
      (to - from) / (24 * 60 * 60 * 1000) * hoursPerDay
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

  function getDateOffset(date) {
    const min = new Date(years[0], 0, 1)
    const max = new Date(years[years.length - 1] + years[1] - years[0], 0, 0)
    return (date - min) / (max - min)
  }

  function formatDate(date) {
    return date.toLocaleString("en-US", { dateStyle: "medium" })
  }

  function getTimeline(timeline, key) {
    const activeOffset = getDateOffset(now)
    const activeKeyframes = `timeline-appear-${key}-active`

    return (
      <>
        {timeline.map(({ from, to, active }) => {
          const left = getDateOffset(from)
          const right = getDateOffset(to)
          const keyframesName = `timeline-appear-${key}-${from.getTime()}`

          return <>
            <style key={`${from.getTime()}-keyframes`}>{`
              @keyframes ${keyframesName} {
                0%              { right: ${(1 - left) * 100}%; }
                ${left * 100}%  { right: ${(1 - left) * 100}%; }
                ${right * 100}% { right: ${(1 - right) * 100}%; }
                100%            { right: ${(1 - right) * 100}%; }
              }
            `}</style>
            <div key={`${from.getTime()}-rect`} className={active ? styles.active : null} style={{
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
              0%                     { width: 0px; }
              ${activeOffset * 100}% { width: 0px; }
              100%                   { right: 4px; }
            }
          `}</style>
          <div className={styles.activeCap} style={{
            left: `${activeOffset * 100}%`,
            width: 4,
            animation: `${activeKeyframes} 1s linear forwards`
          }}></div>
        </>}
      </>
    )
  }

  function getTableData(item) {
    return (
      <>
        <td>
          <h3>{item.name}</h3>
        </td>
        <td></td>
        <td colSpan={years.length} className={styles.timeline}>
          {getTimeline(item.timeline, item.key)}
        </td>
        <td>
          <span title={`${item.hours.toLocaleString("en-US")} hours (approx.)`}>
            {item.roundedHours.toLocaleString("en-US")}+
          </span>
        </td>
      </>
    )
  }

  const tableData = React.useMemo(() => timelineItems.map(item => ({
    item,
    td: getTableData(item)
  })), [timelineItems, years, now])

  return (
    <table className={styles.timeline}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th className={styles.spacing}></th>
          {years.map(year =>
            <th key={year} className={styles.legend}><span>{year}</span></th>
          )}
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
