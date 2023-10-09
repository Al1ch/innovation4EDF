"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import styles from "./Modal.module.scss";
import AddIcon from "@/assets/vectors/add.svg";
import Button from "../Button/Button";
import CrossIcon from "@/assets/vectors/cross.svg";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  handleModal: () => void;
  showButton?: boolean;
  buttonModal: React.JSX.Element;
};

const Modal = ({
  isOpen,
  children,
  handleModal,
  showButton = false,
  buttonModal: ButtonModal,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        handleModal();
      }
    };
    isOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleModal]);

  return (
    <>
      {showButton && ButtonModal}
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
