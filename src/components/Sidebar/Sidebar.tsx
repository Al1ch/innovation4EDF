import React from "react";
import styles from "./Sidebar.module.scss";
import edf from "@/assets/images/edf.png";
import Image from "next/image";
import ModalIntroducing from "../ModalIntroducing/ModalIntroducing";
import Minutor from "../Minutor/Minutor";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={edf} alt="Logo" width={40} height={40} />
        <h2 className={styles.title}>Joconde</h2>
      </div>
      <ModalIntroducing />
      <Minutor />
    </div>
  );
};

export default Sidebar;
