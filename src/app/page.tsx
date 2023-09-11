import Image from "next/image";
import styles from "./page.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import DragAndDropField from "@/components/DragAndDropModal/DragAndDropModal";

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
