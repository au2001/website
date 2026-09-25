"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./header.module.scss";

const pages = [
  { name: "about", label: "About", href: "/" },
  { name: "experience", label: "Experience", href: "/#experience" },
  { name: "blog", label: "Blog", href: "/blog" },
  { name: "contact", label: "Contact", href: "/contact" },
];

export default function Header({ bordered = false }: { bordered?: boolean }) {
  const segment = usePathname();
  const menu = React.useRef<HTMLDetailsElement>(null);

  const activePage = React.useMemo(() => {
    if (segment === "/") return "about";
    else if (segment.startsWith("/blog")) return "blog";
    else if (segment.startsWith("/contact")) return "contact";
    else return undefined;
  }, [segment]);

  function closeMenu() {
    if (menu.current !== null) menu.current.open = false;
  }

  const links = (
    <ul className={styles.links}>
      {pages.map((page) => (
        <li key={page.name}>
          <Link
            href={page.href}
            className={activePage === page.name ? styles.active : undefined}
            aria-current={activePage === page.name ? "page" : undefined}
            onClick={closeMenu}
          >
            {page.label}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="https://github.com/au2001/website"
          target="_blank"
          rel="nofollow external noreferrer noopener"
          className={styles.external}
        >
          GitHub
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M4 10L10 4M5 4h5v5" />
          </svg>
        </Link>
      </li>
    </ul>
  );

  return (
    <header
      className={
        bordered ? `${styles.header} ${styles.bordered}` : styles.header
      }
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M4 20L12 6L23 11L18 24L4 20M12 6L18 24" />
            <path d="M4 20h0M12 6h0M23 11h0M18 24h0" />
          </svg>
          Aurélien Garnier
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {links}
        </nav>

        <details ref={menu} className={styles.menu}>
          <summary aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" className={styles.open} />
              <path d="M5 5l12 12M17 5L5 17" className={styles.close} />
            </svg>
          </summary>
          <nav aria-label="Primary" className={styles.panel}>
            {links}
          </nav>
        </details>
      </div>
    </header>
  );
}
