"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {
  const segment = usePathname();

  const activePage = React.useMemo(() => {
    if (segment === "/") return "about";
    else if (segment.startsWith("/learn")) return "learn";
    else if (segment.startsWith("/portfolio")) return "portfolio";
    else if (segment.startsWith("/contact")) return "contact";
    else return undefined;
  }, [segment]);

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.links}>
          <li>
            <Link
              href="/"
              className={activePage === "about" ? styles.active : undefined}
            >
              About
            </Link>
          </li>
          {/*
          <li>
            <Link
              href="/learn"
              className={activePage === "learn" ? styles.active : undefined}
            >
              Learn
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className={activePage === "portfolio" ? styles.active : undefined}
            >
              Portfolio
            </Link>
          </li>
          */}
          <li>
            <Link
              href="/contact"
              className={activePage === "contact" ? styles.active : undefined}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/au2001/website"
              target="_blank"
              rel="nofollow external noreferrer noopener"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/socials/GitHub.svg"
                alt=""
                className={styles.logo}
              />
              GitHub
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
