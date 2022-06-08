import * as React from "react"

import docLinks from "../data/doc_links.json"
import links from "../data/links.json"
import * as styles from "./index.module.scss"

export default function IndexPage() {
  return (
    <main className={styles.page}>
      <title>Home Page</title>
      <h1 className={styles.heading}>
        Congratulations
        <br />
        <span className={styles.headingAccent}>— you just made a Gatsby site! </span>
        🎉🎉🎉
      </h1>
      <p className={styles.paragraph}>
        Edit <code className={styles.code}>src/pages/index.tsx</code> to see this page
        update in real-time. 😎
      </p>
      <ul className={styles.doclist}>
        {docLinks.map(doc => (
          <li className={styles.docLink}>
            <a
              className={styles.link}
              href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}
            >
              {doc.text}
            </a>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        {links.map(link => (
          <li key={link.url} className={styles.listItem} style={{ color: link.color }}>
            <span>
              <a
                className={styles.link}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter-ts`}
              >
                {link.text}
              </a>
              {link.badge && (
                <span className={styles.badge} aria-label="New Badge">
                  NEW!
                </span>
              )}
              <p className={styles.description}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  )
}
