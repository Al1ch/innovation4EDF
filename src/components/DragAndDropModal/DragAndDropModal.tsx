"use client";

import React, { ComponentPropsWithoutRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import styles from "./DragAndDropModal.module.scss";
import AddIcon from "@/assets/vectors/add.svg";
import Button from "../Button/Button";
import UploadIcon from "@/assets/vectors/upload.svg";
import DragDrop from "../DragDropFiles/DragDrop";

const DragAndDropModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">
          Add Files <AddIcon className={styles.icon} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <DragDrop />
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DragAndDropModal;
