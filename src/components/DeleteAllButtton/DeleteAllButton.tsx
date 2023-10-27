"use client";
import React from "react";
import Button from "@/components/Button/Button";
import styles from "./DeleteAllButton.module.scss";
import { deleteAllFilesData } from "@/app/_action";
import { usePathname } from "next/navigation";
import { File } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/config/firebase";

type Props = {
  filesList?: File[];
};

const DeleteAllButton = async ({ filesList }: Props) => {
  const pathName = usePathname();

  const handleDeleteAll = async () => {
    filesList?.map(async (file) => {
      await deleteAllFilesData(pathName);
      const fileRef = ref(
        storage,
        `files/${file.name.split(`_${file.type}`)[0]}.${file.format}`
      );
      await deleteObject(fileRef);
    });
  };

  return (
    <Button
      size="md"
      backgroundColor="red"
      onClick={async () => await handleDeleteAll()}
    >
      <span className={styles.buttonLabel}>Supprimer</span>
    </Button>
  );
};

export default DeleteAllButton;
