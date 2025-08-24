import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./CartCard.module.css";

export default function CartCard({ game, toggleCartItem, inCart }) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/detail/${game.id}`);
  const handleToggleCart = (e) => {
    e.preventDefault();
    toggleCartItem(game);
  };

  return (
    <div className={s.card_container}>
      <div className={s.card_image} style={{ backgroundImage: `url(${game.mainImage})` }} onClick={handleNavigate}>
        {game.onSale > 0 && <span className={s.sale_badge}>-{game.onSale}%</span>}
      </div>

      <div className={s.card_info}>
        <h3 onClick={handleNavigate}>{game.name}</h3>
        <p>{game.description.length > 100 ? game.description.slice(0, 100) + "..." : game.description}</p>
        <div className={s.card_actions}>
          <div className={s.price_container}>
            {game.onSale > 0 ? (
              <>
                <span className={s.price_sale}>${game.priceWithSale.toFixed(2)}</span>
                <span className={s.price_original}>${game.price.toFixed(2)}</span>
              </>
            ) : (
              <span className={s.price}>${game.price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleToggleCart}
            className={`${s.cart_btn} ${inCart ? s.inCart : ""}`}
          >
            {inCart ? "Remover" : "Agregar al Carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
