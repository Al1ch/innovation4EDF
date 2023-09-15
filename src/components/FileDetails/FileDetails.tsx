import React from "react";
import styles from "./FileDetails.module.scss";
import FileIcon from "@/assets/vectors/file.svg";
import Button from "../Button/Button";
import TrashIcon from "@/assets/vectors/trash.svg";
import { deleteFileData } from "@/app/_action";

type Props = {
  id: number;
  name: string;
  type: string;
  size: number;
  updatedAt: Date;
};

const FileDetails = ({ name, type, size, updatedAt, id }: Props) => {
  const handleDelete = async (fileId: number, pathName: string) => {
    "use server";
    await deleteFileData(fileId, pathName);
  };

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
        <Button handleClick={handleDelete} size="sm">
          <TrashIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};

export default FileDetails;
