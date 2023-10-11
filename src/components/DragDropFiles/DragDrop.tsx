"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";
import { addFileData } from "@/app/_action";
import { FileFormat } from "@/model";
import { usePathname } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import * as pdfjs from "pdfjs-dist";
import { storage } from "@/config/firebase";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js`;

type Props = {
  setIsModalOpen: () => void;
};

const DragDrop = ({ setIsModalOpen }: Props) => {
  const [error, setError] = useState(false);
  const [filesInput, setFilesInput] = useState<FileFormat[] | File[]>([]);
  const [filesTest, setFilesTest] = useState<File[]>([]);
  const [filesInputWithAllData, setFilesInputWithAllData] = useState<
    FileFormat[] | File[]
  >([]);
  const formRef = useRef<HTMLFormElement>(null);

  const format = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/pdf": "pdf",
  };

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

  const handleSubmit = async () => {
    for (let i = 0; i < filesTest.length; i++) {
      const storageRef = ref(storage, `files/${filesTest[i].name}`);
      let docEndPoint = "";
      try {
        await uploadBytes(storageRef, filesTest[i] as File);
        docEndPoint = await getDownloadURL(storageRef);
        addFileData(
          { ...filesInputWithAllData[i], url: docEndPoint },
          pathName
        );
      } catch (e) {
        console.log(e);
      }
    }

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
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          docText = excelData.join("");
          type = "xlsx";
        }

        const fileName = `${file.name.split(".")[0]}_${getSecurityTypeOfFile(
          docText
        )}`;

        const fileData = {
          name: fileName,
          format: type,
          size: file.size / 1024,
          type: getSecurityTypeOfFile(docText),
        };
        setFilesInputWithAllData((prev) => [...prev, fileData] as FileFormat[]);
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

    setFilesTest(listOfFiles);

    setFilesInput(listOfFiles);
    listOfFiles.forEach((file) => {
      extractFileFromDoc(file);
    });
  };

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLFormElement>) => {
    const listOfFiles = Array.from(event.dataTransfer.files);

    const listOfFilesFilteredByFormat = listOfFiles.filter(
      (file) =>
        format[file.type as keyof typeof format].includes("pdf") ||
        format[file.type as keyof typeof format].includes("docx") ||
        format[file.type as keyof typeof format].includes("xlsx")
    );

    if (listOfFilesFilteredByFormat.length !== listOfFiles.length) {
      setError(true);
    } else {
      setError(false);
    }

    setFilesTest(listOfFiles);

    setFilesInput(listOfFilesFilteredByFormat);
    listOfFilesFilteredByFormat.forEach((file) => {
      extractFileFromDoc(file);
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
        {error && (
          <span className={styles.error}>
            Seul les fichier .docx .pdf .xlsx sont acceptés
          </span>
        )}
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
