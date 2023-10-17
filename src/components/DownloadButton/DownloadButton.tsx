"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./DownloadButton.module.scss";
import DownloadIcon from "@/assets/vectors/download.svg";

type Props = {
  url: string;
};

export const DownloadButton = ({ url }: Props) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "Example File";
    link.href = url;
    link.click();
  };
  return (
    <Button backgroundColor="white" size="md" onClick={handleDownload}>
      <DownloadIcon className={styles.icon} />
    </Button>
  );
};

export default DownloadButton;
