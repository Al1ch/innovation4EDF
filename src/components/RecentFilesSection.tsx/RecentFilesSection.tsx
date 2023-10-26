import React from "react";
import styles from "./RecentFileSection.module.scss";
import { getFilesData } from "@/app/_action";
import FileCard from "../FileCard/FileCard";

const RecentFilesSection = async () => {
  const filesList = (await getFilesData()).files;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Fichiers Récents</h2>
      {filesList?.length === 0 ? (
        <div className={styles.empty}>
          <h3>Aucun fichier pour le moment</h3>
        </div>
      ) : (
        <div className={styles.fileList}>
          {filesList && filesList.length < 3
            ? filesList?.map((file, index) => (
                <FileCard key={index} {...file} />
              ))
            : filesList
                ?.slice(filesList.length - 3, filesList.length)
                .map((file, index) => <FileCard key={index} {...file} />)}
        </div>
      )}
    </div>
  );
};

export default RecentFilesSection;
