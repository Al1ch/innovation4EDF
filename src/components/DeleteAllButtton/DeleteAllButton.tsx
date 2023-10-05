import React from "react";
import Button from "@/components/Button/Button";
import styles from "./DeleteAllButton.module.scss";
import { deleteAllFilesData } from "@/app/_action";
import { usePathname } from "next/navigation";
const DeleteAllButton = () => {
  const pathName = usePathname();
  return (
    <Button
      size="md"
      backgroundColor="red"
      onClick={async () => await deleteAllFilesData(pathName)}
    >
      <span className={styles.buttonLabel}>Delete All</span>
    </Button>
  );
};

export default DeleteAllButton;
