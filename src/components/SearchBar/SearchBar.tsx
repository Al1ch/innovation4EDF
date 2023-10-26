"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "@/assets/vectors/search.svg";
import { useRouter } from "next/navigation";
import CloseIcon from "@/assets/vectors/close.svg";
import Button from "@/components/Button/Button";
import { useParams } from "next/navigation";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleDelete = () => {
    setSearchValue("");
    router.replace("/");
  };

  useEffect(() => {
    const handleSubmit = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        router.replace(`?search=${searchValue}`);
      }
    };

    document.addEventListener("keydown", handleSubmit);

    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [router, searchValue]);

  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon} />
      <form>
        <input
          type="text"
          className={styles.input}
          onChange={handleChange}
          placeholder="Rechercher un fichier "
          value={searchValue}
        />
      </form>

      {searchValue && (
        <Button size="sm" onClick={handleDelete}>
          <CloseIcon className={styles.icon} />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
