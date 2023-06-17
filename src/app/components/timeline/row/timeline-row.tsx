import React from "react";

import timelineData from "@/data/timeline.json";

import styles from "./timeline-row.module.scss";

export default function TimelineRow({
  item,
  years,
  now,
}: {
  item: (typeof timelineData)[number];
  years: number[];
  now: Date;
}) {
  const timeline = React.useMemo(
    () =>
      item.timeline.map(({ from, to, hoursPerDay }) => ({
        from: from === "now" ? now : new Date(from),
        to: to === "now" ? now : new Date(to),
        hoursPerDay,
        active: to === "now",
      })),
    [item.timeline, now]
  );

  const hours = React.useMemo(
    () =>
      Math.round(
        timeline
          .map(
            ({ from, to, hoursPerDay }) =>
              ((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000)) *
              hoursPerDay
          )
          .reduce((a, b) => a + b)
      ),
    [timeline]
  );

  const roundedHours = React.useMemo(
    () => hours - (hours % Math.pow(10, Math.floor(Math.log10(hours)))),
    [hours]
  );

  function getDateOffset(date: Date) {
    const min = new Date(years[0], 0, 1);
    const max = new Date(years[years.length - 1] + years[1] - years[0], 0, 0);
    return (date.getTime() - min.getTime()) / (max.getTime() - min.getTime());
  }

  function formatDate(date: Date) {
    return date.toLocaleString("en-US", { dateStyle: "medium" });
  }

  const key = item.name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-?[^a-z]|^-|-$)/g, "");
  const activeOffset = getDateOffset(now);
  const activeKeyframes = `timeline-appear-${key}-active`;

  return (
    <>
      <td>
        <h3>{item.name}</h3>
      </td>
      <td className={styles.spacing}></td>
      <td colSpan={years.length} className={styles.timelineDesktop}>
        {timeline.map(({ from, to, active }) => {
          const left = getDateOffset(from);
          const right = getDateOffset(to);
          const keyframesName = `timeline-appear-${key}-${from.getTime()}`;

          return (
            <>
              <style>{`
              @keyframes ${keyframesName} {
                0%              { right: ${(1 - left) * 100}%; }
                ${left * 100}%  { right: ${(1 - left) * 100}%; }
                ${right * 100}% { right: ${(1 - right) * 100}%; }
                100%            { right: ${(1 - right) * 100}%; }
              }
            `}</style>
              <div
                className={active ? styles.active : undefined}
                style={{
                  left: `${left * 100}%`,
                  right: `${(1 - right) * 100}%`,
                  animation: `${keyframesName} 1s linear forwards`,
                }}
                title={
                  active
                    ? `Since ${formatDate(from)}`
                    : `From ${formatDate(from)} to ${formatDate(to)}`
                }
              ></div>
            </>
          );
        })}

        {timeline.some(({ active }) => active) && (
          <>
            <style>{`
            @keyframes ${activeKeyframes} {
              0%                     { width: 0em; }
              ${activeOffset * 100}% { width: 0em; }
              100%                   { right: 0.25em; }
            }
          `}</style>
            <div
              className={styles.activeCap}
              style={{
                left: `${activeOffset * 100}%`,
                width: 4,
                animation: `${activeKeyframes} 1s linear forwards`,
              }}
            ></div>
          </>
        )}
      </td>

      <td colSpan={years.length} className={styles.timelineMobile}>
        &ndash;
      </td>
      <td className={styles.spacingMobile}></td>
      <td>
        <span title={`${hours.toLocaleString("en-US")} hours (approx.)`}>
          {roundedHours.toLocaleString("en-US")}+
          <span className={styles.hoursMobile}> hours</span>
        </span>
      </td>
    </>
  );
}
