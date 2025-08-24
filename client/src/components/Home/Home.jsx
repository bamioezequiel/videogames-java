import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/MainCard/Card";
import Footer from "../Footer/Footer";
import Billboard from "./Billboard/Billboard";
import Header from "./Header/Header";
import s from "./Home.module.css";
import { getGames } from "../../redux/actions/gameActions";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const amount = allGames.length;

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  // Selección aleatoria de 3 juegos sin repetición
  const featuredGames = useMemo(() => {
    if (amount < 3) return allGames;
    const shuffled = [...allGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [allGames, amount]);

  return (
    <div className={s.home_container}>
      <Header />

      <div className={s.home_content}>
        {amount > 0 && (
          <div className={s.featured_wrapper}>
            {/* Juego principal destacado */}
            <Card
              key={featuredGames[0].id}
              game={featuredGames[0]}
              size="large"
              tag="DESTACADO"
            />

            {/* Juegos secundarios */}
            <div className={s.secondary_games}>
              <Card
                key={featuredGames[1].id}
                game={featuredGames[1]}
                size="small"
                tag="NUEVO"
              />
              <Card
                key={featuredGames[2].id}
                game={featuredGames[2]}
                size="small"
                tag="NUEVO"
              />
            </div>
          </div>
        )}
      </div>

      <Billboard />
      <Footer />
    </div>
  );
}
