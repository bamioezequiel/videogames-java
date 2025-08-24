import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailGame } from "../../redux/actions/gameActions";
import s from "./Detail.module.css";
import useLoading from "../Loading/Loading";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const detailGame = useSelector((state) => state.detailGame);

  const { isAuth } = useAuthContext();
  const { loading, setLoading, Loading } = useLoading();

  const { cart, isInCart, toggleCartItem } = useCartContext();

  const [currentImage, setCurrentImage] = useState(null);

  // Cargar detalle del juego
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getDetailGame(id));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id, setLoading]);

  // Actualizar la imagen principal cuando cambie el detalle
  useEffect(() => {
    if (detailGame?.mainImage) setCurrentImage(detailGame.mainImage);
  }, [detailGame]);

  const handleImages = useCallback((imgUrl) => setCurrentImage(imgUrl), []);
  const handleReturn = useCallback(() => navigate(-1), [navigate]);

  if (!detailGame?.id) {
    return (
      <div className={s.notFound}>
        <h2>Juego no encontrado</h2>
        <button onClick={handleReturn}>Volver</button>
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <div
      className={s.detail_background}
      style={{
        backgroundImage: `url(${detailGame.mainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={s.detail_container}>
        <div className={s.topLineDetail}>
          <h3 onClick={handleReturn} className={s.returnBtn}>
            Volver
          </h3>
        </div>

        <div className={s.detail_content}>
          {/* Imágenes y etiquetas */}
          <div className={s.details_card_images}>
            <div className={s.flipCard}>
              <img
                src={currentImage}
                className={s.detail_main_image}
                alt={detailGame.name}
              />              
            </div>

            <div className={s.details_images_container}>
              {detailGame.shortScreenshots?.map((img) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => handleImages(img)}
                  className={s.details_image}
                  alt="captura"
                />
              ))}
            </div>
            <div className={s.details_labels_container}>
              <div className={s.allTags}>
                {detailGame.genres?.map((g) => (
                  <span key={g} className={s.detail_tag}>{g}</span>
                ))}
                {detailGame.tags?.map((t) => (
                  <span key={t} className={s.detail_tag}>{t}</span>
                ))}
                {detailGame.platforms?.map((p) => (
                  <span key={p} className={s.detail_tag}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Información principal */}
          <div className={s.detail_content_right}>
            <div className={s.titleDetail}>
              <span className={s.nameGameDetail}>{detailGame.name}</span>
              {detailGame.onSale > 0 ? (
                <div className={s.prices}>
                  <span className={s.salePrice}>
                    {detailGame.priceWithSale} USD
                  </span>
                  <span className={s.oldPrice}>{detailGame.price} USD</span>
                  <span className={s.saleBadge}>-{detailGame.onSale}%</span>
                </div>
              ) : (
                <span className={s.priceGameDetail}>{detailGame.price} USD</span>
              )}
            </div>

            <div className={s.detailInfoNonImp}>
              {/* Rating */}
              <div className={s.detailRating}>
                <strong>Calificación:</strong> ⭐ {detailGame.rating}
              </div>

              {/* Fecha de lanzamiento */}
              <div className={s.detailRelease}>
                <strong>Fecha de lanzamiento:</strong>{" "}
                {detailGame.released
                  ? detailGame.released.split("-").reverse().join("-")
                  : "N/A"}
              </div>

              {/* Descripción */}
              <div className={s.detailDescriptionBox}>
                <p>{detailGame.description}</p>
              </div>
            </div>

            <div className={s.detail_btn_container}>
              <button
                className={s.detail_btn}
                onClick={() => {
                  if (!isAuth) {
                    navigate("/login"); 
                  } else {
                    toggleCartItem(detailGame); 
                  }
                }}
              >
                {isInCart(detailGame.id) ? "Eliminar del carrito" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
