import React from "react";
import styles from "./RecentFileSection.module.scss";
import { getFilesData } from "@/app/_action";
import FileCard from "../FileCard/FileCard";

const RecentFilesSection = async () => {
  const filesList = (await getFilesData()).files;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Files</h2>
      {filesList?.length === 0 ? (
        <div className={styles.empty}>
          <h3>No files for the moment</h3>
        </div>
      ) : (
        <div className={styles.fileList}>
          {filesList
            ?.slice(filesList.length - 3, filesList.length)
            .map((file, index) => (
              <FileCard key={index} {...file} />
            ))}
        </div>
      )}
    </div>
  );
};

export default RecentFilesSection;
