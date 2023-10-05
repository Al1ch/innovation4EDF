"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  backgroundColor?: "blue" | "white" | "red";
};

const Button = ({
  children,
  size = "md",
  backgroundColor,
  disabled = false,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        styles.container,
        size && styles[size],
        backgroundColor && styles[backgroundColor],
        { [styles.disabled]: disabled }
      )}
      {...props}
    >
      <span className={styles.link}>{children}</span>
    </button>
  );
};

export default Button;
