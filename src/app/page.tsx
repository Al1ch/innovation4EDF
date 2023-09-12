import styles from "./page.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import FileListSection from "@/components/FilesListSection/FileListSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar />
      </div>
      <FileListSection />
    </div>
  );
}
