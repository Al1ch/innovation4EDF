"use client";

import React, { useRef, useState } from "react";
import styles from "./DragDrop.module.scss";
import UploadIcon from "@/assets/vectors/upload.svg";
import Button from "../Button/Button";
import FileIcon from "@/assets/vectors/file.svg";
import { addFileData } from "@/app/_action";
import { FileFormat } from "@/model";
import { usePathname } from "next/navigation";
import * as pdfjs from "pdfjs-dist";
import mammoth from "mammoth";

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
      { regex: /(?=.*CA)(?=.*Siret)/, type: "business" },
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

  const extractDocxContent = async (file: File) => {
    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const wordText = await mammoth.extractRawText({ arrayBuffer });
          console.log("Contenu extrait du fichier DOCX : ", wordText.value);
          const fileData = {
            name: file.name,
            format: "docx", // ca affiche pas bizzare ?
            size: file.size / 1024,
            type: getSecurityTypeOfFile(wordText.value),
          };
          setFilesInputWithAllData((prev) => [...prev, fileData]);
        } catch (error) {
          console.error(
            "Erreur lors de l'extraction du contenu du fichier DOCX : ",
            error
          );
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier DOCX : ", error);
    }
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
        const fileData = {
          name: file.name,
          format: file.type,
          size: file.size / 1024,
          type: getSecurityTypeOfFile(pdfText),
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

  const handleDrag = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLFormElement>) => {
    const listOfFiles = Array.from(event.dataTransfer.files);
    setFilesInput(listOfFiles);
    listOfFiles.forEach(async (file) => {
      if (file.type === "application/pdf") {
        await extractFileFromDoc(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        await extractDocxContent(file);
      }
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
