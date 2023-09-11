"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

const Button = ({ children }: Props) => {
  return (
    <button className={styles.container}>
      <span className={styles.link}>{children}</span>
    </button>
  );
};

export default Button;
