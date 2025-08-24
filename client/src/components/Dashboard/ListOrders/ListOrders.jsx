import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import AdminNav from "../AdminNav/AdminNav";
import tableStyles from "../Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, deleteOrder, updateOrderStatus } from "../../../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ListOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders);

  const [filters, setFilters] = useState({ userId: "", status: "", startDate: "", endDate: "" });

  const translateStatus = (status) => {
    switch (status) {
      case "PAID": return "Pagado";
      case "CANCELLED": return "Cancelado";
      default: return "Pendiente";
    }
  };

  useEffect(() => { dispatch(getOrders()); }, [dispatch]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar orden?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar"
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteOrder(id));
        toast.success("Orden eliminada correctamente");
      } catch (error) {
        toast.error("Error al eliminar la orden");
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "PENDING" ? "PAID" : currentStatus === "PAID" ? "CANCELLED" : "PENDING";
    const result = await Swal.fire({
      title: "Cambiar estado",
      text: `Estado actual: ${translateStatus(currentStatus)}\nCambiar a: ${translateStatus(newStatus)}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar"
    });

    if (result.isConfirmed) {
      try {
        await dispatch(updateOrderStatus(id, newStatus));
        toast.success(`Estado actualizado a ${translateStatus(newStatus)}`);
      } catch (error) {
        toast.error("Error al actualizar estado");
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredOrders = orders?.filter((o) => {
    const createdDate = o.createdAt ? o.createdAt.split("T")[0] : "";
    return (!filters.userId || o.userId.includes(filters.userId))
      && (!filters.status || o.status === filters.status)
      && (!filters.startDate || createdDate >= filters.startDate)
      && (!filters.endDate || createdDate <= filters.endDate);
  });

  return (
    <div className={tableStyles.table_container}>
      <AdminNav />
      <ToastContainer />

      <div className={tableStyles.filters}>
        <input type="text" name="userId" placeholder="🔍 Filtrar por User ID" value={filters.userId} onChange={handleFilterChange} />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Todos los estados</option>
          <option value="PENDING">🟡 Pendiente</option>
          <option value="PAID">🟢 Pagado</option>
          <option value="CANCELLED">🔴 Cancelado</option>
        </select>
        <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
      </div>

      <div className={tableStyles.table_wrapper}>
        <table className={tableStyles.fl_table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.length > 0 ? filteredOrders.map((o) => {
              const date = o.createdAt ? o.createdAt.split("T") : ["", ""];
              return (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.userId}</td>
                  <td>{date[0]} {date[1] ? date[1].split(".")[0] : ""}</td>
                  <td>${o.total.toFixed(2)}</td>
                  <td>
                    <span className={
                      o.status === "PAID" ? tableStyles.status_paid :
                      o.status === "CANCELLED" ? tableStyles.status_cancelled :
                      tableStyles.status_pending
                    }>
                      {translateStatus(o.status)}
                    </span>
                  </td>
                  <td>
                    <button className={tableStyles.viewBtn} onClick={() => navigate(`/orders/${o.id}`)} title="Ver detalle"><FaEye /></button>
                    <button className={tableStyles.editBtn} onClick={() => handleStatusChange(o.id, o.status)} title="Cambiar estado"><AiFillEdit /></button>
                    <button className={tableStyles.deleteBtn} onClick={() => handleDelete(o.id)} title="Eliminar orden"><MdDelete /></button>
                  </td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="6" className={tableStyles.noItems}>No hay órdenes que coincidan con los filtros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
