"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import DragDrop from "../DragDropFiles/DragDrop";

const DragAndDropModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal isOpen={isOpen} handleModal={() => setIsOpen(!isOpen)}>
      <DragDrop setIsModalOpen={() => setIsOpen(!isOpen)} />
    </Modal>
  );
};

export default DragAndDropModal;
