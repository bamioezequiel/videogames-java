import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/CardGame/Card";
import s from "./Store.module.css";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import {
  filtersGames,
  getAllGames,
  getGames,
  ordersGames,
} from "../../redux/actions/gameActions";

export default function Store() {
  const dispatch = useDispatch();
  const { tags, platforms, genres, filterGenres, filterPlatforms, filterTags, filteredGames } = useSelector(state => state);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const [filters, setFilters] = useState({
    tags: filterTags.value || "all",
    platforms: filterPlatforms.value || "all",
    genres: filterGenres.value || "all",
    alpha: "x",
    rating: "x",
    price: "x",
  });

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames?.slice(indexOfFirstGame, indexOfLastGame) || [];

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const resetSelectors = () => {
    const resetValues = {
      tags: "all",
      platforms: "all",
      genres: "all",
      alpha: "x",
      rating: "x",
      price: "x",
    };
    setFilters(resetValues);
    dispatch(getGames()); 
    setCurrentPage(1);
  };

  const handleChangeSelect = async (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));

    if (["tags", "genres", "platforms"].includes(id)) {
      await dispatch(filtersGames(id, value));
    }

    if (["alpha", "rating", "price"].includes(id)) {
      setFilters(prev => ({
        ...prev,
        alpha: id === "alpha" ? value : "x",
        rating: id === "rating" ? value : "x",
        price: id === "price" ? value : "x",
      }));
      await dispatch(ordersGames(id, value));
    }

    setCurrentPage(1);
  };

  return (
    <div className={s.store_container}>
      {/* FILTROS */}
      <div className={s.store_filter}>
        <select id="tags" value={filters.tags} onChange={handleChangeSelect}>
          <option value="x" disabled>Seleccione una etiqueta</option>
          <option value="all">Todas las etiquetas</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select id="platforms" value={filters.platforms} onChange={handleChangeSelect}>
          <option value="x" disabled>Seleccione una plataforma</option>
          <option value="all">Todas las plataformas</option>
          {platforms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select id="genres" value={filters.genres} onChange={handleChangeSelect}>
          <option value="x" disabled>Seleccione un género</option>
          <option value="all">Todos los géneros</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select id="alpha" value={filters.alpha} onChange={handleChangeSelect}>
          <option value="x" disabled>Orden alfabético</option>
          <option value="all">-</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select id="rating" value={filters.rating} onChange={handleChangeSelect}>
          <option value="x" disabled>Ordenar por puntuación</option>
          <option value="all">-</option>
          <option value="asc">5-1</option>
          <option value="desc">1-5</option>
        </select>

        <select id="price" value={filters.price} onChange={handleChangeSelect}>
          <option value="x" disabled>Ordenar por precio</option>
          <option value="all">-</option>
          <option value="asc">De mayor a menor</option>
          <option value="desc">De menor a mayor</option>
        </select>

        <button onClick={resetSelectors}>Reiniciar</button>

        <SearchBar resetSelectors={resetSelectors} paginado={setCurrentPage} />
      </div>

      <div className={s.store_pagination_view_container}>
        <div className={s.viewContainer}>
          <span>Mostrar:</span>
          <select
            value={gamesPerPage}
            onChange={(e) => {
              setGamesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
          </select>
        </div>

        <div className={s.store_pagination}>
          {Array.from(
            { length: Math.ceil(filteredGames?.length / gamesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? s.active : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      <div className={s.store_list}>
        {currentGames.length > 0 ? (
          currentGames.map((g) => (
            <Card
              key={g.id}
              game={g}
              tag={g.on_sale > 0 ? "EN OFERTA" : g.featured ? "DESTACADO" : "COMPRAR"}
            />
          ))
        ) : (
          <p className={s.no_games_message}>No hay juegos que coincidan con los filtros seleccionados.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
