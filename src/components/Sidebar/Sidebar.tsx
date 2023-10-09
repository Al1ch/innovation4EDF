import React from "react";
import styles from "./Sidebar.module.scss";
import edf from "@/assets/images/edf.png";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Link from "next/link";
import DocumentSVG from "@/assets/vectors/document.svg";
import DragDrop from "@/components/DragDropFiles/DragDrop";
import Modal from "../Modal/Modal";
import ModalIntroducing from "../ModalIntroducing/ModalIntroducing";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={edf} alt="Logo" width={40} height={40} />
        <h2 className={styles.title}>Joconde</h2>
      </div>
      <ModalIntroducing />
    </div>
  );
};

export default Sidebar;
