import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./FakePaymentForm.module.css";
import Swal from "sweetalert2";
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderActions";

export default function FakePaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { cart, clearCart } = useCartContext();
  const { user, token } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = cart.reduce((sum, g) => sum + (g.priceWithSale ?? g.price ?? 0), 0);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !name || !expiry || !cvv) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      Swal.fire("Error", "Número de tarjeta inválido", "error");
      return;
    }

    if (cvv.length !== 3) {
      Swal.fire("Error", "CVV inválido", "error");
      return;
    }

    const productListHtml = cart.map((g) => `
      <div class="${s.productItem}">
        <span>${g.name}</span>
        <span>$${(g.priceWithSale ?? g.price).toFixed(2)}</span>
      </div>
    `).join("");

    Swal.fire({
      title: "Procesando pago...",
      html: `
        <div style="margin-bottom: 10px">Por favor, no cierres la ventana</div>
        <div class="${s.productsContainer}">${productListHtml}</div>
        <div class="${s.progressBarContainer}">
          <div class="${s.progressBar}" id="progressBar"></div>
        </div>
        <div style="margin-top: 5px; text-align:right; font-weight:bold;">
          Total: $${totalAmount.toFixed(2)} USD
        </div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        const progressBar = Swal.getHtmlContainer().querySelector("#progressBar");
        let width = 0;
        const interval = setInterval(() => {
          width += 2;
          progressBar.style.width = width + "%";
          if (width >= 100) {
            clearInterval(interval);
            Swal.close();

            const orderData = {
                userId: user.id,
                gameIds: cart.map(g => g.id),
                status: "PAID"
            };

            dispatch(createOrder(orderData, token))
              .then(() => {
                Swal.fire("¡Éxito!", "Pago aprobado y orden creada", "success").then(() => {
                  clearCart();
                  navigate("/profile");
                });
              })
              .catch((err) => {
                console.error(err);
                Swal.fire("Error", "No se pudo crear la orden", "error");
              });
          }
        }, 50);
      }
    });
  };

  return (
    <form className={s.paymentForm} onSubmit={handleSubmit}>
      <h2 className={s.paymentTitle}>Pago simulado</h2>
      <p className={s.paymentTotal}>Total: ${totalAmount.toFixed(2)} USD</p>

      <div className={s.inputGroup}>
        <FaCreditCard className={s.icon} />
        <input
          className={s.inputField}
          type="text"
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
      </div>

      <div className={s.inputGroup}>
        <FaUser className={s.icon} />
        <input
          className={s.inputField}
          type="text"
          placeholder="Nombre del titular"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={s.inputRow}>
        <div className={s.inputGroupSmall}>
          <FaCalendarAlt className={s.icon} />
          <input
            className={s.inputFieldSmall}
            type="text"
            placeholder="MM/AA"
            value={expiry}
            onChange={handleExpiryChange}
          />
        </div>
        <div className={s.inputGroupSmall}>
          <FaLock className={s.icon} />
          <input
            className={s.inputFieldSmall}
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={handleCvvChange}
          />
        </div>
      </div>

      <button className={s.paymentBtn} type="submit">Pagar</button>
    </form>
  );
}
