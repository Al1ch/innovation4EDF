"use client";
import React from "react";
import Button from "@/components/Button/Button";
import TrashIcon from "@/assets/vectors/trash.svg";
import styles from "./DeleteButton.module.scss";
import { deleteFileData } from "@/app/_action";
import { usePathname } from "next/navigation";

type Props = {
  fileId: number;
};

const DeleteButton = ({ fileId }: Props) => {
  const handleDelete = async (fileId: number, pathName: string) => {
    await deleteFileData(fileId, pathName);
  };
  const pathName = usePathname();

  return (
    <Button
      onClick={async () => await handleDelete(fileId, pathName)}
      size="sm"
    >
      <TrashIcon className={styles.icon} />
    </Button>
  );
};

export default DeleteButton;
