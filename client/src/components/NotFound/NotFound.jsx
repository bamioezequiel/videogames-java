import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import s from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.code}>404</div>
        <FaGamepad className={s.icon} />
        <p className={s.text}>
          ¡Ups! No encontramos el juego que buscas.
        </p>
        <button className={s.btn} onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
