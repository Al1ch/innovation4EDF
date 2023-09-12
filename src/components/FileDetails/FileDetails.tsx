import React from "react";
import styles from "./FileDetails.module.scss";
import FileIcon from "@/assets/vectors/file.svg";

type Props = {
  name?: string;
  type?: string;
  size?: string;
  date?: string;
};

const FileDetails = ({ name, type, size, date }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainInfoFile}>
        <FileIcon className={styles.icon} />
        <span className={styles.name}>Coucou</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.type}>
          <span className={styles.details}>Document</span>
        </div>
        <div className={styles.size}>
          <span className={styles.details}>48MB</span>
        </div>
        <div className={styles.date}>
          <span className={styles.details}>03/08/2023</span>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
