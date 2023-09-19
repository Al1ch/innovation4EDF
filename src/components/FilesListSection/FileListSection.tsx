import React from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import prisma from "../../../lib/prisma";

const FileListSection = async () => {
  const filesList = await prisma.file.findMany();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Files List</h2>
      <div className={styles.headerList}>
        <span className={styles.titleCol}>
          Name <TriangleIcon className={styles.icon} />
        </span>
        <div className={styles.secondaryInfo}>
          <span className={styles.titleCol}>
            Format <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            File size <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            Type <TriangleIcon className={styles.icon} />
          </span>
        </div>
      </div>
      {filesList.map((file) => (
        <FileDetails key={file.id} {...file} />
      ))}
    </div>
  );
};

export default FileListSection;
