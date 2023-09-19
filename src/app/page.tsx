import styles from "./page.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import FileListSection from "@/components/FilesListSection/FileListSection";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.header}>
          <SearchBar />
        </div>
        <FileListSection />
      </div>
    </div>
  );
}
