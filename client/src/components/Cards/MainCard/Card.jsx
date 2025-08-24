import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ game, size, tag }) {
  
  return (
    <NavLink style={{textDecoration: 'none'}} to={`/detail/${game.id}`}>
    <div
      className={s.card_container}
      style={{
        width: '80vh',
        height: (size === 'small' ? '31vh' : '62.7vh'),
        backgroundImage: `url(${game.mainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top" }} >
      <div className={s.card_content} style={{
        height: (size === 'small' ? '15vh' : '20vh')
         }}>
        <span className={s.card_title}>
            <span className={s.card_tag}>{tag}</span> 
            {game.name}
        </span>
        <span className={s.card_subtitle}>{game.description.slice(0, 120)}...</span>
      </div>
    </div>
    </NavLink>
  );
}
