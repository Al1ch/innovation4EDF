"use client";
import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import TriangleIcon from "@/assets/vectors/triangle.svg";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  list: string[];
  title: string;
  searchParams: { [key: string]: string | string[] | undefined };
  onClick: () => void;
  isClicked?: boolean;
};

const DropDown = ({
  list,
  title,
  searchParams,
  onClick: handleClickDropDown,
  isClicked,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
} & Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (filterValue: string) => {
    !Object.keys(searchParams).includes("format") &&
      router.replace(
        `?${
          Object.keys(searchParams).length === 0 ? params : "&"
        }format=${filterValue}`
      );
  };

  return (
    <div className={styles.titleCol} onClick={handleClickDropDown}>
      <div className={styles.filterTitle}>
        <span className={styles.title}>
          {title} <TriangleIcon className={styles.icon} />
        </span>
        {isClicked && (
          <div className={styles.dropDown}>
            {list.map((item, index) => (
              <div
                key={index}
                className={styles.dropDownItem}
                onClick={() => handleClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
