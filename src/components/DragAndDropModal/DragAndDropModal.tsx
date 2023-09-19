"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import styles from "./DragAndDropModal.module.scss";
import AddIcon from "@/assets/vectors/add.svg";
import Button from "../Button/Button";
import DragDrop from "../DragDropFiles/DragDrop";
import CrossIcon from "@/assets/vectors/cross.svg";

const DragAndDropModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="Button violet" onClick={handleClick}>
        Add Files <AddIcon className={styles.icon} />
      </button>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <Button onClick={() => setIsOpen(false)} size="sm">
                <CrossIcon className={styles.icon} />
              </Button>
            </div>
            <DragDrop />
          </div>
        </div>
      )}
    </>
  );
};

export default DragAndDropModal;
