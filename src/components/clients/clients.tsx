import Link from "next/link";

import clientsData from "@/data/clients.json";

import styles from "./clients.module.scss";

export default function Clients() {
  return (
    <>
      <h1 className={styles.heading}>Who I work for</h1>

      <ul className={styles.clients}>
        {clientsData.map((client, i) => (
          <li key={i}>
            <Link
              href={client.website}
              target="_blank"
              rel="nofollow external noreferrer noopener"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={client.logo} alt={client.name} title={client.name} />
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.note}>And many more&hellip;</p>
    </>
  );
}
