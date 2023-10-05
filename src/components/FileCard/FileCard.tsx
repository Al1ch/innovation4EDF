import React from "react";
import styles from "./FileCard.module.scss";
import PdfIcon from "@/assets/vectors/pdf.svg";
import WordIcon from "@/assets/vectors/word.svg";
import ExcelIcon from "@/assets/vectors/excel.svg";
import { FileFormat } from "@/model";

const fileTypeIcon = {
  pdf: <PdfIcon className={styles.icon} />,
  docx: <WordIcon className={styles.icon} />,
  xlsx: <ExcelIcon className={styles.icon} />,
};

type Props = {
  name: string;
  type: string;
  format: string;
};

const FileCard = ({ format, name, type }: Props) => {
  return (
    <div className={styles.container}>
      {fileTypeIcon[format as keyof typeof fileTypeIcon]}
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default FileCard;
