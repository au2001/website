import React from "react";
import TimelineRow from "./row/timeline-row";

import timelineData from "@/data/timeline.json";

import styles from "./timeline.module.scss";

export default function Timeline() {
  const now = React.useMemo(() => new Date(), []);

  const years = React.useMemo(() => {
    const minDate = Math.min(
      ...timelineData.map((item) =>
        Math.min(...item.timeline.map(({ from }) => new Date(from).getTime())),
      ),
    );

    const count = 4;

    const minYear = new Date(minDate).getFullYear();
    let maxYear = now.getFullYear();
    maxYear -= (maxYear - minYear) % (count - 1);

    return [...new Array(count)].map(
      (_, i) => minYear + ((maxYear - minYear) / (count - 1)) * i,
    );
  }, [now]);

  return (
    <table className={styles.timeline}>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {years.map((year, i) => (
            <th key={i} className={styles.legend}>
              <span>{year}</span>
            </th>
          ))}
          <th></th>
          <th>Hours invested</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h2>I do</h2>
          </td>
          <TimelineRow item={timelineData[0]} years={years} now={now} />
        </tr>
        {timelineData.slice(1).map((item, i) => (
          <tr key={i}>
            <td></td>
            <TimelineRow item={item} years={years} now={now} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
