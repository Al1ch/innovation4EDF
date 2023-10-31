import React from "react";
import styles from "./Input.module.scss";

type Props = {
  label: string;
};
const Input = ({ label }: Props) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor="email">
        {label}
      </label>
      <input className={styles.input} type="email" id="email" />
    </div>
  );
};

export default Input;
