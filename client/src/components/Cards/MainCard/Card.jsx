import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ game, size, tag }) {
  // Alturas fijas para desktop, y clamp para móvil
  const cardHeight = size === "small" 
    ? "31vh" 
    : "62.7vh";

  const contentHeight = size === "small" 
    ? "15vh" 
    : "20vh";

  return (
    <NavLink style={{ textDecoration: 'none' }} to={`/detail/${game.id}`}>
      <div
        className={s.card_container}
        style={{
          width: '100%',
          maxWidth: (size === 'small' ? '400px' : '800px'),
          height: cardHeight,
          backgroundImage: `url(${game.mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={s.card_content}
          style={{ height: contentHeight }}
        >
          <span className={s.card_title}>
            <span className={s.card_tag}>{tag}</span>
            {game.name}
          </span>
          <span className={s.card_subtitle}>
            {game.description.slice(0, 120)}...
          </span>
        </div>
      </div>
    </NavLink>
  );
}
