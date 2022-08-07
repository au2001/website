import * as React from "react"

import interviewData from "/src/data/interview.tsx"

import * as styles from "./interview.module.scss"

export default function Interview() {
  return (
    <>
      <h1 className={styles.heading}>
        Let’s do a quick interview
      </h1>

      <ul className={styles.interview}>
        {interviewData.map(entry =>
          <li key={entry.question}>
            <h2><b>Q:</b> {entry.question}</h2>
            <p dangerouslySetInnerHTML={{
              __html: `<b>A:</b> ${entry.answer}`
            }}></p>
          </li>
        )}
      </ul>
    </>
  )
}
