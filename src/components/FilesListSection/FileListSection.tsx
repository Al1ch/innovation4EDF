import React from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";

const FileListSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Files List</h2>
      <div className={styles.headerList}>
        <span className={styles.titleCol}>
          Name <TriangleIcon className={styles.icon} />
        </span>
        <div className={styles.secondaryInfo}>
          <span className={styles.titleCol}>
            Type <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            File size <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            Last modified <TriangleIcon className={styles.icon} />
          </span>
        </div>
      </div>
      <FileDetails />
    </div>
  );
};

export default FileListSection;
