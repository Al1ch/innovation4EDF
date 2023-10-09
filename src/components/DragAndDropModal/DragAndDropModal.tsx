"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import DragDrop from "../DragDropFiles/DragDrop";
import Button from "../Button/Button";
import AddIcon from "@/assets/vectors/add.svg";
import styles from "./DragAndDropModal.module.scss";

const DragAndDropModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const button = (
    <Button onClick={() => setIsOpen(!isOpen)} backgroundColor="blue" size="md">
      <AddIcon className={styles.icon} />
      <span className={styles.label}>Add Files</span>
    </Button>
  );
  return (
    <Modal
      isOpen={isOpen}
      handleModal={() => setIsOpen(!isOpen)}
      showButton={true}
      buttonModal={button}
    >
      <DragDrop setIsModalOpen={() => setIsOpen(!isOpen)} />
    </Modal>
  );
};

export default DragAndDropModal;
