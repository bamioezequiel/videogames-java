import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../context/AuthContext";
import { getAllUsers } from "../../redux/actions/userActions";
import { getAllOrders } from "../../redux/actions/cartActions";
import { getAllGames } from "../../redux/actions/gameActions";
import AdminNav from "./AdminNav/AdminNav";
import s from "./Dashboard.module.css";
import { FaUser, FaGamepad, FaDollarSign, FaStar, FaUserShield, FaCalendarAlt } from "react-icons/fa";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const users = useSelector((state) => state.allUsers);
  const allGames = useSelector((state) => state.allGames);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);

  const calculateApprovedTransactions = () =>
    orders?.reduce((total, order) => order.status === "approved" ? total + (order.total || 0) : total, 0) || 0;

  const countFeaturedGames = () =>
    allGames?.filter(game => game.featured).length || 0;

  const countNewGames = () =>
    allGames?.filter(game => game.isNew).length || 0;

  const countAdmins = () =>
    users?.filter(u => u.role === "ADMIN" || u.role === "OWNER").length || 0;

  return (
    <div className={s.dashboard_container}>
      <AdminNav />

      <div className={s.dashboard_welcome}>
        <h2>¡Bienvenido, {user?.name} {user?.lastname}!</h2>
        <p>Panel de administración de tu plataforma de videojuegos</p>
      </div>


      <div className={s.dashboard_stats_container}>
        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#0d6efd" }}>
          <FaUser size={42} />
          <h2>{users?.length || 0}</h2>
          <hr />
          <h3>Usuarios Registrados</h3>
        </div>

        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#6f42c1" }}>
          <FaUserShield size={42} />
          <h2>{countAdmins()}</h2>
          <hr />
          <h3>Usuarios Admin</h3>
        </div>

        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#e74c3c" }}>
          <FaGamepad size={42} />
          <h2>{allGames?.length || 0}</h2>
          <hr />
          <h3>Juegos Registrados</h3>
        </div>

        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#ffc107" }}>
          <FaStar size={42} />
          <h2>{countFeaturedGames()}</h2>
          <hr />
          <h3>Juegos Destacados</h3>
        </div>

        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#198754" }}>
          <FaCalendarAlt size={42} />
          <h2>{countNewGames()}</h2>
          <hr />
          <h3>Juegos Nuevos</h3>
        </div>

        <div className={s.dashboard_stats_item} style={{ backgroundColor: "#28a745" }}>
          <FaDollarSign size={42} />
          <h2>${calculateApprovedTransactions()}</h2>
          <hr />
          <h3>Ingresos Totales</h3>
        </div>
      </div>      
    </div>
  );
}
