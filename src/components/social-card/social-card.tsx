import Link from "next/link";
import Clipboard from "@/components/clipboard/clipboard";

import socialsData from "@/data/socials.json";

import styles from "./social-card.module.scss";

export default function SocialCard({
  social,
}: {
  social: (typeof socialsData)[number];
}) {
  const account = `${social.prefix || ""}${social.account}`;

  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={social.logo} alt="" className={styles.logo} />
      <span className={styles.name}>{social.name}</span>
      <span className={styles.account}>{account}</span>
    </>
  );

  return social.link !== undefined ? (
    <Link
      href={social.link}
      target={social.link.startsWith("http") ? "_blank" : undefined}
      rel="nofollow external noreferrer noopener"
      className={styles.card}
    >
      {content}
    </Link>
  ) : (
    <Clipboard
      text={social.account}
      message={`My ${social.name} account is:\n${account}\n\nIt has been copied to your clipboard.`}
      className={styles.card}
    >
      {content}
    </Clipboard>
  );
}
