"use client";

import React, { ComponentPropsWithoutRef, useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";

type Props = ComponentPropsWithoutRef<"input"> & {
  children: React.ReactNode;
};

const DragDrop = () => {
  const [filesInput, setFilesInput] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: FormData) => {
    console.log("STATE", filesInput);
    formRef.current?.reset();
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    console.log("FILES", event.dataTransfer.files);
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setFilesInput([...filesInput, ...files]);
    event.preventDefault();
  };

  return (
    <form
      className={styles.container}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      action={handleSubmit}
      ref={formRef}
    >
      <input
        className={styles.fileInput}
        id="inputFileUpload"
        name="inputFileUpload"
        type="file"
      />
      <label htmlFor="inputFileUpload" className={styles.label}>
        <UploadIcon className={styles.icon} />
        <span>
          <span className={styles.bold}>Click to Upload </span>
          or drag and drop your file here
        </span>
        <div className={styles.listFiles}>
          {filesInput.length > 0 &&
            filesInput.map((file) => (
              <span key={file.name}>
                <FileIcon style={{ height: 20, width: 20 }} />
                {file.name}
              </span>
            ))}
        </div>
      </label>
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default DragDrop;
