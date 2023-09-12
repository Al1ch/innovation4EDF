"use client";

import React, { useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";
import { addFileData } from "@/app/_action";
import { FileFormat } from "@/model";
import { usePathname } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

const DragDrop = () => {
  const [filesInput, setFilesInput] = useState<FileFormat[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const pathName = usePathname();

  const handleSubmit = () => {
    filesInput.forEach((file) => {
      addFileData(file, pathName);
    });
    setFilesInput([]);
    formRef.current?.reset();
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size / (1024 * 1024),
    }));
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
