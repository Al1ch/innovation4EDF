import styles from "./page.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import FileListSection from "@/components/FilesListSection/FileListSection";
import Sidebar from "@/components/Sidebar/Sidebar";
import RecentFilesSection from "@/components/RecentFilesSection.tsx/RecentFilesSection";
import DragAndDropModal from "@/components/DragAndDropModal/DragAndDropModal";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.header}>
          <SearchBar />
        </div>
        <div className={styles.body}>
          <div className={styles.features}>
            <h1 className={styles.title}>Joconde</h1>
            <div className={styles.buttonContainer}>
              <DragAndDropModal />
            </div>
          </div>
          <RecentFilesSection />
          <FileListSection searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
