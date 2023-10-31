import React from "react";
import styles from "./SignupForm.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Input from "@/components/Input/Input";

const SignupForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Input label="Username" />
        <Input label="Email" />
        <Input label="Password" />
        <Input label="Confirm Password" />
      </form>
      <Button backgroundColor="black" size="xl">
        <span className={styles.buttonLabel}>Crée un Compte</span>
      </Button>
      <div> Or </div>
      <span className={styles.text}>
        if you already have an account, please
        <Link href="/signIn"> Sign in </Link>
      </span>
    </div>
  );
};

export default SignupForm;
