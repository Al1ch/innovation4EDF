import React from "react";
import styles from "./Sidebar.module.scss";
import edf from "@/assets/images/edf.png";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Link from "next/link";
import DocumentSVG from "@/assets/vectors/document.svg";
import DragDrop from "@/components/DragDropFiles/DragDrop";
import DragAndDropModal from "../DragAndDropModal/DragAndDropModal";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={edf} alt="Logo" width={40} height={40} />
        <h2 className={styles.title}>Innovation4EDF</h2>
      </div>
      <Button backgroundColor="blue">
        <DocumentSVG className={styles.logo} />
        <p className={styles.text}>Files</p>
      </Button>
      <DragAndDropModal />
    </div>
  );
};

export default Sidebar;
