import styles from "./tag.module.scss";

export default function Tag({ name }: { name: string }) {
  return <span className={styles.tag}>#{name}</span>;
}
