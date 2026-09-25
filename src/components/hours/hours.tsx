import timelineData from "@/data/timeline.json";

import styles from "./hours.module.scss";

// Number of rows to show, by decreasing amount of hours invested
const COUNT = 12;

// Time for the bars to sweep across the whole chart when it appears, in seconds
const DURATION = 1;

const DAY = 24 * 60 * 60 * 1000;
const YEAR = 365.25 * DAY;

function formatDate(date: Date) {
  return date.toLocaleString("en-US", { dateStyle: "medium", timeZone: "UTC" });
}

// Bars get thicker as more hours per day were invested
function getThickness(hoursPerDay: number) {
  return Math.round(3 + 11 * Math.sqrt(hoursPerDay / 6));
}

export default function Hours() {
  const now = new Date();

  const minYear = Math.min(
    ...timelineData.flatMap((item) =>
      item.timeline.map(({ from }) => new Date(from).getUTCFullYear()),
    ),
  );
  const min = Date.UTC(minYear, 0, 1);
  const max = Date.UTC(now.getUTCFullYear() + 1, 0, 1);

  function getOffset(date: Date | number) {
    return (new Date(date).getTime() - min) / (max - min);
  }

  // One tick every 3 years, leaving room for the "Now" label
  const ticks = [];
  for (
    let year = minYear;
    Date.UTC(year, 0, 1) < now.getTime() - 1.5 * YEAR;
    year += 3
  ) {
    ticks.push(year);
  }

  const rows = timelineData
    .map((item) => {
      const segments = item.timeline.map(({ from, to, hoursPerDay }) => ({
        from: new Date(from),
        to: to === "now" ? now : new Date(to),
        hoursPerDay,
        active: to === "now",
      }));

      const hours = Math.round(
        segments
          .map(
            ({ from, to, hoursPerDay }) =>
              ((to.getTime() - from.getTime()) / DAY) * hoursPerDay,
          )
          .reduce((a, b) => a + b),
      );

      const roundedHours =
        hours - (hours % Math.pow(10, Math.floor(Math.log10(hours))));

      return { name: item.name, segments, hours, roundedHours };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, COUNT);

  const nowOffset = getOffset(now);

  return (
    <section className={styles.hours} aria-labelledby="hours-title">
      <h2 id="hours-title" className={styles.heading}>
        Hours invested
      </h2>
      <p className={styles.description}>
        Where the last {now.getUTCFullYear() - minYear} years went, estimated
        from hours per day. Thicker bars mean more hours a day.
      </p>

      <div className={styles.chart}>
        <div className={styles.axis} aria-hidden="true">
          {ticks.map((year) => (
            <span
              key={year}
              className={styles.tick}
              style={{ left: `${getOffset(Date.UTC(year, 0, 1)) * 100}%` }}
            >
              {year}
            </span>
          ))}
          <span
            className={`${styles.tick} ${styles.now}`}
            style={{ left: `${nowOffset * 100}%` }}
          >
            Now
          </span>
        </div>

        <ul className={styles.rows}>
          {rows.map((row) => (
            <li key={row.name} className={styles.row}>
              <span className={styles.name}>{row.name}</span>

              <span className={styles.track} aria-hidden="true">
                {row.segments.map(({ from, to, hoursPerDay, active }) => {
                  const left = getOffset(from);
                  const right = getOffset(to);

                  return (
                    <span
                      key={from.getTime()}
                      className={
                        active ? `${styles.bar} ${styles.active}` : styles.bar
                      }
                      style={{
                        left: `${left * 100}%`,
                        width: `${(right - left) * 100}%`,
                        height: getThickness(hoursPerDay),
                        animationDelay: `${left * DURATION}s`,
                        animationDuration: `${(right - left) * DURATION}s`,
                      }}
                      title={
                        active
                          ? `Since ${formatDate(from)}`
                          : `From ${formatDate(from)} to ${formatDate(to)}`
                      }
                    ></span>
                  );
                })}

                {row.segments.some(({ active }) => active) && (
                  <span
                    className={styles.node}
                    style={{
                      left: `${nowOffset * 100}%`,
                      animationDelay: `${nowOffset * DURATION}s`,
                    }}
                  ></span>
                )}
              </span>

              <span
                className={styles.value}
                title={`${row.hours.toLocaleString("en-US")} hours (approx.)`}
              >
                {row.roundedHours.toLocaleString("en-US")}+{" "}
                <abbr title="hours">h</abbr>
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.range} aria-hidden="true">
          <span>{minYear}</span>
          <span className={styles.now}>Now</span>
        </p>
      </div>
    </section>
  );
}
