import React from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import prisma from "../../../lib/prisma";
import FileListFilters from "../FileListFilters/FileListFilters";

const FileListSection = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const filesList = await prisma.file.findMany();
  const searchParam = searchParams?.search;

  const fileListFilteredBySearch = filesList.filter((file) =>
    file.name.includes(searchParam as string)
  );

  const filteredProject = searchParam ? fileListFilteredBySearch : filesList;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Files List</h2>
      <div className={styles.headerList}>
        <span className={styles.title}>
          Name <TriangleIcon className={styles.icon} />
        </span>
        <FileListFilters searchParams={searchParams} />
      </div>
      {filteredProject.map((file) => (
        <FileDetails key={file.id} {...file} />
      ))}
    </div>
  );
};

export default FileListSection;
