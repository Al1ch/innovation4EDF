"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";
import { addFileData } from "@/app/_action";
import { FileFormat } from "@/model";
import { usePathname } from "next/navigation";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js

`;

const DragDrop = () => {
  const [filesInput, setFilesInput] = useState<FileFormat[]>([]);
  const [textFile, setTextFile] = useState<string>();
  const [extractedFiles, setExtractedFile] = useState<File>();
  const formRef = useRef<HTMLFormElement>(null);

  const getSecurityTypeOfFile = (text: string) => {
    const regexs = [
      { regex: /(?=.*prénom)(?=.*nom)(?=.*numéro)/i, type: "private" },
      { regex: /(?=.*Chiffre d'affaire)(?=.*Siret)/i, type: "business" },
    ];
    let type = "";
    for (const regex of regexs) {
      if (regex.regex.test(text)) {
        type = regex.type;
        break;
      }
    }
    return type;
  };

  useEffect(() => {
    if (textFile && extractedFiles) {
      const type = getSecurityTypeOfFile(textFile);
      const files = {
        name: extractedFiles?.name,
        type: type,
        size: extractedFiles?.size,
        format: extractedFiles?.type,
      };

      setFilesInput([...filesInput, files]);
      setExtractedFile(undefined);
    }
  }, [textFile, extractedFiles, filesInput]);

  const pathName = usePathname();

  const handleSubmit = () => {
    filesInput.forEach((file) => {
      addFileData(file, pathName);
    });
    setFilesInput([]);
    formRef.current?.reset();
  };

  const extractFileFromDoc = async (file: File) => {
    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        let pdfText = "";

        const arrayBuffer = e.target?.result;
        const pdfData = new Uint8Array(arrayBuffer as ArrayBuffer);
        const pdf = await pdfjs.getDocument(pdfData).promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();

          pageText.items.forEach((textItem) => {
            if ("str" in textItem) {
              pdfText += textItem.str;
            }
          });
        }
        setTextFile(pdfText);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'extraction du texte du PDF :",
        error
      );
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLFormElement>) => {
    event.stopPropagation();
    setExtractedFile(event.dataTransfer.files[0]);
    await extractFileFromDoc(event.dataTransfer.files[0]);

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
      <Button type="submit" backgroundColor="blue">
        Upload
      </Button>
    </form>
  );
};

export default DragDrop;
