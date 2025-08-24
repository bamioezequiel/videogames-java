import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGames } from "../../../redux/actions/gameActions";
import Card from "../../Cards/CardGame/Card";
import s from "./Billboard.module.css";

export default function Billboard() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const loading = useSelector((state) => state.loading); // opcional si tienes un flag en redux

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getGames());
    }
  }, [dispatch, allGames.length]);

  // Seleccionamos juegos destacados ordenados por relevancia
  const billboardGames = useMemo(() => {
    return [...allGames]
      .sort((a, b) => b.on_sale - a.on_sale || b.featured - a.featured)
      .slice(0, 12);
  }, [allGames]);

  return (
    <div className={s.billboard_container}>
      <h2 className={s.billboard_title}>Store</h2>

      <div className={s.cards_container}>
        {loading ? (
          <span>Loading...</span> // aquí podrías poner un skeleton loader
        ) : billboardGames.length > 0 ? (
          billboardGames.map((g) => (
            <Card
              key={g.id}
              game={g}
              tag={
                g.on_sale > 0
                  ? `-${g.on_sale}%`
                  : g.featured
                  ? "FEATURED"
                  : "BUY"
              }
            />
          ))
        ) : (
          <span>No games found</span>
        )}
      </div>

      <NavLink to="/store" className={s.billboard_btn}>
        See more...
      </NavLink>
    </div>
  );
}
