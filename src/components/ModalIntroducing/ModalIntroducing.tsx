"use client";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./ModalIntroducing.module.scss";
import Button from "../Button/Button";
import AddIcon from "@/assets/vectors/add.svg";

const ModalIntroducing = () => {
  const [isOpen, setIsOpen] = useState(true);

  const button = (
    <Button onClick={() => setIsOpen(!isOpen)} backgroundColor="gray" size="lg">
      <span className={styles.label}>Project Info</span>
    </Button>
  );
  return (
    <Modal
      isOpen={isOpen}
      handleModal={() => setIsOpen(!isOpen)}
      showButton={true}
      buttonModal={button}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Bienvenue sur le Projet Joconde !</h2>
        <div className={styles.info}>
          <p className={styles.text}>
            Bonjour tralalallalalallalala trallaalallalala bien venue sur le
            projet Joconde qjui consiste a trallalaalBonjour
            tralalallalalallalala trallaalallalala bien venue sur le projet
            Joconde qjui consiste a trallalaalBonjour tralalallalalallalala
            trallaalallalala bien venue sur le projet Joconde qjui consiste a
            trallalaal Bonjour tralalallalalallalala trallaalallalala bien venue
            sur le projet Joconde qjui consiste a trallalaal Bonjour
            tralalallalalallalala trallaalallalala bien venue sur le projet
            Joconde qjui consiste a trallalaal
          </p>
        </div>
        <Button
          size="lg"
          backgroundColor="blue"
          onClick={() => setIsOpen(false)}
        >
          <span> Start </span>
        </Button>
      </div>
      ;
    </Modal>
  );
};

export default ModalIntroducing;
