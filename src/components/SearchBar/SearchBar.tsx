import React from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "@/assets/vectors/search.svg";

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon} />
      <input className={styles.input} placeholder="Search Your file "></input>
    </div>
  );
};

export default SearchBar;
