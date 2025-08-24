import React, { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { filterSearch } from "../../redux/actions/gameActions";
import s from "./SearchBar.module.css";

export default function SearchBar({ resetSelectors, paginado }) {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const timeoutRef = useRef(null);

  const handleSearchBar = (e) => {
    e.preventDefault();
    setSearchBar((prev) => !prev);
    if (searchBar) {
      setInputValue("");
      resetSelectors();
      paginado(1);
      dispatch(filterSearch("")); // Limpia el filtro cuando se cierra
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() !== "") {
      dispatch(filterSearch(value));
      resetSelectors();
      paginado(1);
    } else {
      dispatch(filterSearch("")); // Limpia el filtro si borran el input
    }
  };

  useEffect(() => {
    if (searchBar) {
      timeoutRef.current = setTimeout(() => {
        if (inputValue.trim() === "") {
          setSearchBar(false);
        }
      }, 20000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [searchBar, inputValue]);

  return (
    <div className={s.search_container}>
      <input
        type="search"
        placeholder="Search..."
        onChange={handleSearch}
        value={inputValue}
        className={searchBar ? `${s.search_input} ${s.active_input}` : s.search_input}
      />
      <div onClick={handleSearchBar} className={s.search_icon_wrap}>
        <BiSearch className={s.search_icon} />
      </div>
    </div>
  );
}
