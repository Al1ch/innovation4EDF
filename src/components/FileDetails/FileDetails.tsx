import React from "react";
import styles from "./FileDetails.module.scss";
import FileIcon from "@/assets/vectors/file.svg";
import DeleteButton from "../DeleteButton/DeleteButton";

type Props = {
  id: number;
  name: string;
  type: string;
  size: number;
  updatedAt: Date;
  format: string;
};

const FileDetails = ({ name, type, size, updatedAt, format, id }: Props) => {
  // const getCorrectTimeFormat = (time?: number) => {
  //   if (!time) return;
  //   if (time < 10) {
  //     return `0${time}`;
  //   }
  //   return time;
  // };

  return (
    <div className={styles.container}>
      <div className={styles.mainInfoFile}>
        <FileIcon className={styles.icon} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.type}>
          <span className={styles.details}>{format.split("/")[1]}</span>
        </div>
        <div className={styles.size}>
          <span className={styles.details}>{size}ko</span>
        </div>
        <div className={styles.date}>
          <span className={styles.details}>
            {/* {getCorrectTimeFormat(updatedAt.getDay())}/
            {getCorrectTimeFormat(updatedAt.getMonth())}/
            {updatedAt.getFullYear()}{" "}
            {getCorrectTimeFormat(updatedAt.getHours())}:
            {getCorrectTimeFormat(updatedAt.getMinutes())}:
            {getCorrectTimeFormat(updatedAt.getSeconds())} */}
            {type}
          </span>
        </div>
        <DeleteButton fileId={id} />
      </div>
    </div>
  );
};

export default FileDetails;
