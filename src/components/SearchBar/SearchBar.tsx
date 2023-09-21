"use client";
import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "@/assets/vectors/search.svg";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
          placeholder="Search Your file "
        />
      </form>
    </div>
  );
};

export default SearchBar;
