import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import profileStyles from "./Profile.module.css"; 
import tableStyles from "./../Dashboard/Table.module.css"; 
import UserCard from "../Cards/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllUsers, updateUserRole } from "../../redux/actions/userActions";
import { getOrdersByUser } from "../../redux/actions/orderActions";
import Swal from "sweetalert2";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, logout, user } = useAuthContext();
  const orders = useSelector((state) => state.userOrders);
  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.id) dispatch(getOrdersByUser(user.id));
    if (isAdmin) dispatch(getAllUsers());
  }, [dispatch, user?.id, isAdmin]);

  const handleReturn = () => navigate(-1);

  const handleViewOrder = (id) => navigate(`/orders/${id}`);

  const handleChangeRole = (id, role) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Deseas cambiar el rol de este usuario a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUserRole(id, role));
        Swal.fire("Actualizado", "El rol ha sido actualizado", "success");
      }
    });
  };

  return (
    <div className={profileStyles.profile_container}>
      <span className={profileStyles.returnBtn} onClick={handleReturn}>
        Volver
      </span>

      <div className={profileStyles.profile_content}>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <UserCard />
          </div>
        {/* Barra de navegación */}
        <nav className={profileStyles.profile_nav}>
          {isAdmin && (
            <NavLink to="/dashboard" className={profileStyles.profile_btn}>
              Dashboard
            </NavLink>
          )}
          <button className={profileStyles.profile_btn_leave} onClick={logout}>
            Cerrar sesión
          </button>
        </nav>

        {/* Órdenes */}
        <section>
          <h3>Mis órdenes</h3>
          <table className={tableStyles.fl_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Cantidad de items</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <span
                        className={
                          order.status === "PAID"
                            ? tableStyles.status_paid
                            : order.status === "CANCELLED"
                            ? tableStyles.status_cancelled
                            : tableStyles.status_pending
                        }
                      >
                        {order.status === "PAID"
                          ? "Pagado"
                          : order.status === "CANCELLED"
                          ? "Cancelado"
                          : "Pendiente"}
                      </span>
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.gameIds?.length}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className={tableStyles.viewBtn}
                        onClick={() => handleViewOrder(order.id)}
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={tableStyles.noItems}>
                    No hay órdenes registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Usuarios (solo admin) */}
        {isAdmin && allUsers?.length > 0 && (
          <section>
            <h3>Usuarios registrados</h3>
            <table className={tableStyles.fl_table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className={
                          u.role === "admin"
                            ? tableStyles.inactiveBtn
                            : tableStyles.activeBtn
                        }
                        onClick={() =>
                          handleChangeRole(
                            u.id,
                            u.role === "admin" ? "user" : "admin"
                          )
                        }
                      >
                        {u.role === "admin" ? "Quitar admin" : "Hacer admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
}
