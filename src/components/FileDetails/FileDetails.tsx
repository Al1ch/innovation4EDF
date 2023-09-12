import React from "react";
import styles from "./FileDetails.module.scss";
import FileIcon from "@/assets/vectors/file.svg";

type Props = {
  name: string;
  type: string;
  size: number;
  updatedAt: Date;
};

const FileDetails = ({ name, type, size, updatedAt }: Props) => {
  const getCorrectTimeFormat = (time?: number) => {
    if (!time) return;
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainInfoFile}>
        <FileIcon className={styles.icon} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.type}>
          <span className={styles.details}>{type.split("/")[1]}</span>
        </div>
        <div className={styles.size}>
          <span className={styles.details}>{size}MB</span>
        </div>
        <div className={styles.date}>
          <span className={styles.details}>
            {getCorrectTimeFormat(updatedAt.getDay())}/
            {getCorrectTimeFormat(updatedAt.getMonth())}/
            {updatedAt.getFullYear()}{" "}
            {getCorrectTimeFormat(updatedAt.getHours())}:
            {getCorrectTimeFormat(updatedAt.getMinutes())}:
            {getCorrectTimeFormat(updatedAt.getSeconds())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
