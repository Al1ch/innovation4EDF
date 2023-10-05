"use client";
import React, { useEffect, useState } from "react";
import styles from "./FileListFilters.module.scss";
import DropDown from "../DropDown/DropDown";
import DeleteAllButton from "../DeleteAllButtton/DeleteAllButton";
import { usePathname } from "next/navigation";
import { deleteAllFilesData } from "@/app/_action";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const FileListFilters = ({ searchParams }: Props) => {
  const pathName = usePathname();
  const [dropDown, setDropDown] = useState({
    format: false,
    fileSize: false,
    type: false,
  });

  useEffect(() => {
    setInterval(() => {
      deleteAllFilesData(pathName);
    }, 20 * 60 * 60000);
  }, [pathName]);

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
      <DeleteAllButton />
    </div>
  );
};

export default FileListFilters;
