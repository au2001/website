import styles from "./title.module.scss";

export default function Title({
  pretitle,
  title,
  subtitle,
  center = false,
}: {
  pretitle?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`${styles.heading} ${center ? styles.center : ""}`}>
      {pretitle !== undefined && (
        <h1 className={styles.pretitle}>{pretitle}</h1>
      )}

      <h1 className={styles.title}>{title}</h1>

      {subtitle !== undefined && (
        <h2 className={styles.subtitle}>{subtitle}</h2>
      )}
    </div>
  );
}
