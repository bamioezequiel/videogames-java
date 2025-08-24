import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import AdminNav from "../AdminNav/AdminNav";
import tableStyles from "../Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteGame, getAllGames, updateGame } from "../../../redux/actions/gameActions";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { orderings } from "../../../utils/filtersAndOrders";

export default function ListGames() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [games, setGames] = useState([]);
  const [orderType, setOrderType] = useState(false);

  useEffect(() => { dispatch(getAllGames()); }, [dispatch]);
  useEffect(() => { setGames(allGames); }, [allGames]);

  const handleSort = (e, field) => {
    e.preventDefault();
    const newOrder = !orderType;
    setOrderType(newOrder);
    const orderedGames = orderings(allGames, field, newOrder ? "asc" : "desc");
    setGames(orderedGames);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteGame(id));
        await dispatch(getAllGames());
        toast.success("Juego eliminado correctamente");
      } catch {
        toast.error("Error al eliminar el juego");
      }
    }
  };

  const toggleStatus = async (e, game, field) => {
    e.preventDefault();
    const updatedGame = { ...game, [field]: !game[field] };
    const label = field === "featured" ? "Destacado" : field === "new" ? "Nuevo" : "Activo";

    const result = await Swal.fire({
      title: `Cambiar estado de ${label}?`,
      text: `Se establecerá ${label} en ${!game[field] ? "Sí" : "No"}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(updateGame(game.id, updatedGame));
        await dispatch(getAllGames());
        toast.success(`${label} actualizado correctamente`);
      } catch {
        toast.error(`Error al actualizar ${label}`);
      }
    }
  };

  return (
    <div className={tableStyles.table_container}>
      <AdminNav />
      <ToastContainer />

      <div className={tableStyles.table_wrapper}>
        <table className={tableStyles.fl_table}>
          <thead>
            <tr>
              <th>Id</th>
              <th onClick={(e) => handleSort(e, "alpha")}>Nombre</th>
              <th onClick={(e) => handleSort(e, "date")}>Lanzamiento</th>
              <th onClick={(e) => handleSort(e, "rating")}>Rating</th>
              <th onClick={(e) => handleSort(e, "price")}>Precio</th>
              <th onClick={(e) => handleSort(e, "onSale")}>Descuento</th>
              <th onClick={(e) => handleSort(e, "featured")}>Destacado</th>
              <th onClick={(e) => handleSort(e, "new")}>Nuevo</th>
              <th onClick={(e) => handleSort(e, "active")}>Activo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {games?.length > 0 ? games.map((g) => (
              <tr key={g.id}>
                <td data-label="Id">{g.id}</td>
                <td data-label="Nombre">{g.name}</td>
                <td data-label="Lanzamiento">{g.released}</td>
                <td data-label="Rating">{g.rating}</td>
                <td data-label="Precio">${g.price}</td>
                <td data-label="Descuento">{g.onSale}%</td>
                <td data-label="Destacado">
                  <button
                    onClick={(e) => toggleStatus(e, g, "featured")}
                    className={g.featured ? tableStyles.activeBtn : tableStyles.inactiveBtn}
                  >
                    {g.featured ? "Sí" : "No"}
                  </button>
                </td>
                <td data-label="Nuevo">
                  <button
                    onClick={(e) => toggleStatus(e, g, "new")}
                    className={g.new ? tableStyles.activeBtn : tableStyles.inactiveBtn}
                  >
                    {g.new ? "Sí" : "No"}
                  </button>
                </td>
                <td data-label="Activo">
                  <button
                    onClick={(e) => toggleStatus(e, g, "active")}
                    className={g.active ? tableStyles.activeBtn : tableStyles.inactiveBtn}
                  >
                    {g.active ? "Sí" : "No"}
                  </button>
                </td>
                <td data-label="Editar">
                  <button className={tableStyles.editBtn}><AiFillEdit /></button>
                </td>
                <td data-label="Eliminar">
                  <button className={tableStyles.deleteBtn} onClick={(e) => handleDelete(e, g.id)}><MdDelete /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="11" className={tableStyles.noItems}>
                  No se encontraron juegos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
