"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  size?: string;
  backgroundColor?: string;
};

const Button = ({
  children,
  onClick: handleClick,
  size = "md",
  backgroundColor,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        styles.container,
        styles[size],
        backgroundColor && styles[backgroundColor]
      )}
      {...props}
      onClick={handleClick}
    >
      <span className={styles.link}>{children}</span>
    </button>
  );
};

export default Button;
