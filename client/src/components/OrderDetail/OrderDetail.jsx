import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedOrder, getOrderById } from "../../redux/actions/orderActions";
import s from "./OrderDetail.module.css";

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector((state) => state.selectedOrder);
  const games = useSelector((state) => state.games); 

  const [orderGames, setOrderGames] = useState([]);

  useEffect(() => {
    dispatch(clearSelectedOrder());
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order?.gameIds && games?.length > 0) {
      const selectedGames = games.filter((g) => order.gameIds.includes(g.id));
      setOrderGames(selectedGames);
    }
  }, [order, games]);

  const handleBack = () => navigate(-1);

  const translateStatus = (status) => {
    switch (status) {
      case "PAID": return "Pagado";
      case "CANCELLED": return "Cancelado";
      default: return "Pendiente";
    }
  };

  const statusClass = (status) => {
    switch (status) {
      case "PAID": return s.status_paid;
      case "CANCELLED": return s.status_cancelled;
      default: return s.status_pending;
    }
  };

  if (!order) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando orden...</p>;

  return (
    <div className={s.orderDetail_container}>
      <div className={s.header}>
        <h2>Orden #{order.id}</h2>
        <button className={s.backBtn} onClick={handleBack}>Volver</button>
      </div>

      <div className={s.order_summary}>
        <div className={s.summary_item}>
          <strong>Estado:</strong> 
          <span className={statusClass(order.status)}> {translateStatus(order.status)}</span>
        </div>
        <div className={s.summary_item}><strong>Total:</strong> ${order.total.toFixed(2)}</div>
        <div className={s.summary_item}><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</div>
        {order.userId && <div className={s.summary_item}><strong>User ID:</strong> {order.userId}</div>}
        {orderGames.length > 0 && <div className={s.summary_item}><strong>Cantidad de juegos:</strong> {orderGames.length}</div>}
      </div>

      <h3>Juegos de la orden</h3>
      <div className={s.items_grid}>
        {orderGames.length > 0 ? (
          orderGames.map((game) => {
            const hasDiscount = game.priceWithSale < game.price;
            return (
              <div key={game.id} className={s.item_card}>
                {game.image && <img src={game.image} alt={game.name} className={s.item_image} />}
                <div className={s.item_info}>
                  <h4>{game.name}</h4>
                  <p>
                    Precio: 
                    <span className={hasDiscount ? s.salePrice : ""}>
                      ${hasDiscount ? game.priceWithSale : game.price}
                    </span>
                    {hasDiscount && <span className={s.originalPrice}>${game.price}</span>}
                  </p>
                  {game.genre && <p className={s.genreTag}>{game.genre}</p>}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No se encontraron juegos para esta orden.</p>
        )}
      </div>
    </div>
  );
}
