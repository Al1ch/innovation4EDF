import React from "react";
import styles from "./page.module.scss";
import SignupForm from "@/components/Form/SignupForm/SignupForm";
const signUp = () => {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
};

export default signUp;
