import styles from "./page.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar />
      </div>
      <div className={styles.body}></div>
    </div>
  );
}
