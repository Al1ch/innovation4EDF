"use client";
import React, { useState } from "react";
import styles from "./FileListFilters.module.scss";
import DropDown from "../DropDown/DropDown";
import DeleteAllButton from "../DeleteAllButtton/DeleteAllButton";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const FileListFilters = ({ searchParams }: Props) => {
  const [dropDown, setDropDown] = useState({
    format: false,
    fileSize: false,
    type: false,
  });

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
