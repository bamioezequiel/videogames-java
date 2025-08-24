import s from "./Header.module.css";
import SearchBar from "../../SearchBar/SearchBar";

export default function Header() {

  return (
    <div className={s.header_container}>
      <img
        src="https://imgur.com/ysaROdL.png"
        className={s.header_logo}
        alt="logo not found" />
      <div className={s.header_search_container}>
      </div>     
    </div>
  );
}
