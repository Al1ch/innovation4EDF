import React, { useMemo } from "react";
import styles from "./FileListSection.module.scss";
import FileDetails from "../FileDetails/FileDetails";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import prisma from "../../../lib/prisma";

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

  console.log("fileListFilteredBySearch", fileListFilteredBySearch);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Files List</h2>
      <div className={styles.headerList}>
        <span className={styles.titleCol}>
          Name <TriangleIcon className={styles.icon} />
        </span>
        <div className={styles.secondaryInfo}>
          <span className={styles.titleCol}>
            Format <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            File size <TriangleIcon className={styles.icon} />
          </span>
          <span className={styles.titleCol}>
            Type <TriangleIcon className={styles.icon} />
          </span>
        </div>
      </div>
      {filteredProject.map((file) => (
        <FileDetails key={file.id} {...file} />
      ))}
    </div>
  );
};

export default FileListSection;
