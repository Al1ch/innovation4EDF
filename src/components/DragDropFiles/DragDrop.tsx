"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";
import { addFileData } from "@/app/_action";
import { FileFormat } from "@/model";
import { usePathname } from "next/navigation";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js`;

type Props = {
  setIsModalOpen: () => void;
};

const DragDrop = ({ setIsModalOpen }: Props) => {
  const [filesInput, setFilesInput] = useState<FileFormat[] | File[]>([]);
  const [filesInputWithAllData, setFilesInputWithAllData] = useState<
    FileFormat[]
  >([]);
  const formRef = useRef<HTMLFormElement>(null);

  const getSecurityTypeOfFile = (text: string) => {
    const regexs = [
      { regex: /(?=.*prénom)(?=.*nom)(?=.*numéro)/i, type: "private" },
      { regex: /(?=.*CA)(?=.*Siret)/i, type: "business" },
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

  const pathName = usePathname();

  const handleSubmit = () => {
    filesInputWithAllData.forEach((file) => {
      addFileData(file, pathName);
    });
    setFilesInput([]);
    setIsModalOpen();
    formRef.current?.reset();
  };

  const getContentFromPDF = async (pdfData: Uint8Array) => {
    let pdfContent = "";

    const pdf = await pdfjs.getDocument(pdfData).promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const pageText = await page.getTextContent();

      pageText.items.forEach((textItem) => {
        if ("str" in textItem) {
          pdfContent += textItem.str;
        }
      });
    }
    return pdfContent;
  };

  const extractFileFromDoc = async (file: File) => {
    try {
      const reader = new FileReader();
      let docText = "";
      let type = file.type;

      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);

        if (file.type === "application/pdf") {
          docText = await getContentFromPDF(data);
          type = "pdf";
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          docText = (await mammoth.extractRawText({ arrayBuffer })).value;
          type = "docx";
        } else {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          docText = excelData.join("");
          type = "xlsx";
        }

        const fileData = {
          name: file.name,
          format: type,
          size: file.size / 1024,
          type: getSecurityTypeOfFile(docText),
        };
        setFilesInputWithAllData((prev) => [...prev, fileData]);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'extraction du texte du PDF :",
        error
      );
    }
  };
  const handleClickInput = (event: ChangeEvent<HTMLInputElement>) => {
    const listOfFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    setFilesInput(listOfFiles);
    listOfFiles.forEach(async (file) => {
      await extractFileFromDoc(file);
    });
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLFormElement>) => {
    const listOfFiles = Array.from(event.dataTransfer.files);
    setFilesInput(listOfFiles);
    listOfFiles.forEach(async (file) => {
      await extractFileFromDoc(file);
    });

    event.stopPropagation();
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
        accept=".xlsx, .pdf, .docx"
        onChange={handleClickInput}
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
      <Button
        type="submit"
        disabled={filesInput.length === 0}
        backgroundColor="blue"
      >
        Upload
      </Button>
    </form>
  );
};

export default DragDrop;
