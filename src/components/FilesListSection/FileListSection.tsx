import React from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import FileListFilters from "../FileListFilters/FileListFilters";
import { getFilesData } from "@/app/_action";

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
      <h2 className={styles.title}>Liste des Fichiers</h2>
      <div className={styles.headerList}>
        <span className={styles.info}>
          Nom <TriangleIcon className={styles.icon} />
        </span>
        <FileListFilters
          searchParams={searchParams.searchParams}
          filesList={filesList}
        />
      </div>

      {filteredProject?.map((file) => (
        <FileDetails key={file.id} {...file} />
      ))}
    </div>
  );
};

export default FileListSection;
