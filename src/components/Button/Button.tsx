"use client";
import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";

type Props = ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  size?: string;
  backgroundColor?: string;
  handleClick?: (id: number, pathName: string) => void;
};

const Button = ({
  children,
  onChange: handleClick,
  size = "md",
  backgroundColor = "white",
  ...props
}: Props) => {
  const pathName = usePathname();

  return (
    <button
      className={cn(styles.container, styles[size], styles[backgroundColor])}
      {...props}
      onClick={() => handleClick && handleClick(1, pathName)}
    >
      <span className={styles.link}>{children}</span>
    </button>
  );
};

export default Button;
