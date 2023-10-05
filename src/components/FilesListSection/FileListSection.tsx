import React, { useEffect } from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import FileListFilters from "../FileListFilters/FileListFilters";
import { deleteAllFilesData, getFilesData } from "@/app/_action";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const FileListSection = async (searchParams: Props) => {
  const filesList = (await getFilesData()).files;
  const searchParam = searchParams.searchParams?.search;

  const fileListFilteredBySearch = filesList?.filter((file) =>
    file.name.includes(searchParam as string)
  );

  const filteredProject = searchParam ? fileListFilteredBySearch : filesList;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Files List</h2>
      <div className={styles.headerList}>
        <span className={styles.info}>
          Name <TriangleIcon className={styles.icon} />
        </span>
        <FileListFilters searchParams={searchParams.searchParams} />
      </div>

      {filteredProject?.map((file) => (
        <FileDetails key={file.id} {...file} />
      ))}
    </div>
  );
};

export default FileListSection;
