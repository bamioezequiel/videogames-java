import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import CartCard from "../Cards/CartCard/CartCard";
import Swal from "sweetalert2";
import s from "./Cart.module.css";

export default function Cart() {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();
  const { cart, toggleCartItem } = useCartContext();

  const total = cart.reduce((sum, g) => sum + (g.priceWithSale ?? g.price ?? 0), 0);
  const totalReal = cart.reduce((sum, g) => sum + (g.price ?? 0), 0);

  useEffect(() => {
    if (!isAuth) {
      Swal.fire({
        icon: "error",
        title: "¡Ups!",
        text: "Debes iniciar sesión para acceder al carrito.",
      }).then(() => navigate("/login"));
    }
  }, [isAuth, navigate]);

  const handleRedirectToPayment = () => {
    if (!cart.length) return;

    Swal.fire({
      title: "Redirigiendo al pago...",
      html: `Total a pagar: $${total.toFixed(2)} USD`,
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => Swal.showLoading(),
    }).then(() => {
      navigate("/payment");
    });
  };

  if (!cart.length) {
    return (
      <div className={s.cart_container}>
        <h2>Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className={s.cart_container}>
      <div className={s.cart_content}>
        <div className={s.card_group}>
          <h3>{cart.length} juego{cart.length > 1 ? "s" : ""} en el carrito</h3>
          {cart.map((game) => (
            <CartCard
              key={game.id}
              game={game}
              size="small"
              toggleCartItem={toggleCartItem}
              inCart={true}
            />
          ))}
        </div>

        <div className={s.cart_summary}>
          <h3>Resumen del pedido</h3>

          <div className={s.summary_item}>
            <span>Productos:</span>
            <span>{cart.length}</span>
          </div>

          <div className={s.summary_item}>
            <span>Subtotal:</span>
            <span>${totalReal.toFixed(2)} USD</span>
          </div>

          {total.toFixed(2) !== totalReal.toFixed(2) && (
            <div className={s.summary_item}>
              <span>Descuento:</span>
              <span>-${(totalReal - total).toFixed(2)} USD</span>
            </div>
          )}

          <div className={s.summary_item_total}>
            <span>Total:</span>
            <span>${total.toFixed(2)} USD</span>
          </div>

          <button className={s.checkout_btn} onClick={handleRedirectToPayment}>
            Ir al pago
          </button>
        </div>
      </div>
    </div>
  );
}
