"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./DragAndDropModal.module.scss";
import AddIcon from "@/assets/vectors/add.svg";
import Button from "../Button/Button";
import DragDrop from "../DragDropFiles/DragDrop";
import CrossIcon from "@/assets/vectors/cross.svg";

const DragAndDropModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    isOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Button onClick={handleClick} backgroundColor="blue" size="md">
        <AddIcon className={styles.icon} />
        <span className={styles.label}>Add Files</span>{" "}
      </Button>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.header}>
              <Button onClick={() => setIsOpen(false)} size="sm">
                <CrossIcon className={styles.icon} />
              </Button>
            </div>
            <DragDrop setIsModalOpen={() => setIsOpen(!isOpen)} />
          </div>
        </div>
      )}
    </>
  );
};

export default DragAndDropModal;
