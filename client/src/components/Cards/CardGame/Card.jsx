import { useMemo, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./Card.module.css";
import { useCartContext } from "../../../context/CartContext"; // <-- aquí usamos el contexto
import { useAuthContext } from "../../../context/AuthContext";

export default function Card({ game, tag }) {
  const navigate = useNavigate();
  const { cart, toggleCartItem, isInCart } = useCartContext(); // <-- contexto
  const { isAuth } = useAuthContext();

  // Verifica si el juego está en el carrito comparando por id
  const inCart = useMemo(() => isInCart(game.id), [cart, game.id, isInCart]);

  // Maneja click en el botón del carrito
  const handleClickCart = useCallback(
    (e) => {
      e.preventDefault();
      if (!isAuth) {
        navigate("/login");
        return;
      }
      toggleCartItem(game);
    },
    [isAuth, navigate, toggleCartItem, game]
  );
  // Calcula el precio a mostrar
  const displayPrice = useMemo(
    () => (game.onSale > 0 ? game.priceWithSale : game.price),
    [game.onSale, game.priceWithSale, game.price]
  );

  // Recorta la descripción según el tamaño del nombre
  const description = useMemo(() => {
    const maxLength =
      game.name.length < 20 ? 180 : game.name.length < 40 ? 140 : 110;
    return game.description.length > maxLength
      ? game.description.slice(0, maxLength) + "..."
      : game.description;
  }, [game.name, game.description]);

  return (
    <div className={s.wrapper}>
      <div className={s.topCard}>
        <div
          className={s.wrapper_image}
          style={{
            backgroundImage: `url(${game.mainImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        >
          {game.onSale > 0 && <span className={s.saleBadge}>-{game.onSale}%</span>}
        </div>
      </div>

      <div className={s.outer}>
        <div className={s.content}>
          <div>
            {tag && <span className={s.bg}>{tag}</span>}
            <NavLink to={`/detail/${game.id}`} className={s.navlink}>
              <h2>{game.name}</h2>
            </NavLink>
            <p className={s.cardDescription}>{description}</p>
          </div>

          <div className={s.button}>
            <NavLink to={`/detail/${game.id}`} className={s.price}>
              {game.onSale > 0 ? (
                <>
                  <span className={s.oldPrice}>${game.price}</span>{" "}
                  <span className={s.salePrice}>${displayPrice}</span>
                </>
              ) : (
                <>${displayPrice}</>
              )}
            </NavLink>

            <button
              className={`${s.cart_btn} ${inCart ? s.inCart : ""}`}
              onClick={handleClickCart}
              aria-label={inCart ? "Remove from cart" : "Add to cart"}
            >
              <i className={`${s.cart_icon} ${s.ion_bag}`}></i>
              <span>{inCart ? "REMOVER DEL CARRITO" : "AGREGAR AL CARRITO"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
