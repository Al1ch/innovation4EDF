"use client";
import React, { useEffect, useState } from "react";
import styles from "./FileListFilters.module.scss";
import DropDown from "../DropDown/DropDown";
import DeleteAllButton from "../DeleteAllButtton/DeleteAllButton";
import { usePathname } from "next/navigation";
import { deleteAllFilesData } from "@/app/_action";
import { File } from "@prisma/client";
import { storage } from "@/config/firebase";
import { ref, deleteObject } from "firebase/storage";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  filesList?: File[];
};

const FileListFilters = ({ searchParams, filesList }: Props) => {
  const pathName = usePathname();
  const [dropDown, setDropDown] = useState({
    format: false,
    fileSize: false,
    type: false,
  });

  useEffect(() => {
    setInterval(() => {
      deleteAllFilesData(pathName);
      filesList?.forEach((file) => {
        const storageRef = ref(
          storage,
          `files/${file.name.split(file.type)[0]}.${file.format}`
        );
        deleteObject(storageRef);
      });
    }, 20 * 6000);
  }, [pathName, filesList]);

  return (
    <div className={styles.secondaryInfo}>
      <DropDown
        title="Format"
        list={[".pdf", ".docx", ".xlsx"]}
        searchParams={searchParams}
        onClick={() =>
          setDropDown((prev) => ({ ...prev, format: !prev.format }))
        }
        isClicked={dropDown.format}
      />
      <DropDown
        title="File Size"
        list={[".pdf", ".docx", ".xlsx"]}
        searchParams={searchParams}
        onClick={() =>
          setDropDown((prev) => ({ ...prev, fileSize: !prev.fileSize }))
        }
        isClicked={dropDown.fileSize}
      />
      <DropDown
        title="Type"
        list={["business", "Personnal", " okkkmec letsgo"]}
        searchParams={searchParams}
        onClick={() => setDropDown((prev) => ({ ...prev, type: !prev.type }))}
        isClicked={dropDown.type}
      />
      <DeleteAllButton filesList={filesList} />
    </div>
  );
};

export default FileListFilters;
