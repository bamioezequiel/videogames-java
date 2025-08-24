import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserRole } from "../../../redux/actions/userActions";
import AdminNav from "../AdminNav/AdminNav";
import tableStyles from "../Table.module.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUserShield, FaUser } from "react-icons/fa";

export default function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => { dispatch(getAllUsers()); }, [dispatch]);

  const handleRoleChange = async (id, role) => {
    try {
      await dispatch(updateUserRole(id, role));
      await dispatch(getAllUsers());
      toast.success("Rol actualizado correctamente", { position: "bottom-right", autoClose: 3000 });
    } catch {
      toast.error("Error al actualizar rol", { position: "bottom-right", autoClose: 3000 });
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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? users.map((u) => (
              <tr key={u.id}>
                <td data-label="Id">{u.id}</td>
                <td data-label="Nombre">{u.name}</td>
                <td data-label="Apellido">{u.lastname}</td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Rol">
                  {u.role === "ADMIN" || u.role === "OWNER" ? (
                    <button
                      className={tableStyles.activeBtn}
                      onClick={() => handleRoleChange(u.id, "USER")}
                    >
                      <FaUser /> Admin
                    </button>
                  ) : (
                    <button
                      className={tableStyles.inactiveBtn}
                      onClick={() => handleRoleChange(u.id, "ADMIN")}
                    >
                      <FaUserShield /> User
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className={tableStyles.noItems}>
                  No hay usuarios para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
