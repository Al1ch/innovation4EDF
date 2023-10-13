import React from "react";
import styles from "./FileDetails.module.scss";
import DeleteButton from "../DeleteButton/DeleteButton";
import PdfIcon from "@/assets/vectors/pdf.svg";
import WordIcon from "@/assets/vectors/word.svg";
import ExcelIcon from "@/assets/vectors/excel.svg";
import DownloadButton from "../DownloadButton/DownloadButton";

type Props = {
  id: number;
  name: string;
  type: string;
  size: number;
  updatedAt: Date;
  format: string;
  url: string;
};

const FileDetails = ({ name, type, size, format, id, url }: Props) => {
  const fileTypeIcon = {
    pdf: <PdfIcon className={styles.icon} />,
    docx: <WordIcon className={styles.icon} />,
    xlsx: <ExcelIcon className={styles.icon} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainInfoFile}>
        {fileTypeIcon[format as keyof typeof fileTypeIcon]}
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.type}>
          <span className={styles.details}>{format}</span>
        </div>
        <div className={styles.size}>
          <span className={styles.details}>{size}ko</span>
        </div>
        <div className={styles.date}>
          <span className={styles.details}>{type}</span>
        </div>
        <DeleteButton fileId={id} fileName={name} type={type} format={format} />
        <DownloadButton url={url} />
      </div>
    </div>
  );
};

export default FileDetails;
