"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import styles from "./Modal.module.scss";
import AddIcon from "@/assets/vectors/add.svg";
import Button from "../Button/Button";
import CrossIcon from "@/assets/vectors/cross.svg";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  handleModal: () => void;
};

const Modal = ({ isOpen, children, handleModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current?.contains(event.target as Node)) {
      handleModal();
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
      <Button onClick={handleModal} backgroundColor="blue" size="md">
        <AddIcon className={styles.icon} />
        <span className={styles.label}>Add Files</span>{" "}
      </Button>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.header}>
              <Button onClick={handleModal} size="sm">
                <CrossIcon className={styles.icon} />
              </Button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
