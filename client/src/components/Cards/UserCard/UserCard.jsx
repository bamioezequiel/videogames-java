import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import s from "./UserCard.module.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/userActions";
import { validationsUpdate } from "../../../utils/validations";
import Swal from "sweetalert2";

export default function UserCard() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    name: user.name || "",
    lastname: user.lastname || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
  });

  useEffect(() => {
    setUpdateUserData({
      name: user?.name || "",
      lastname: user?.lastname || "",
    });
    setErrors({
      name: "",
      lastname: "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData((prev) => ({ ...prev, [name]: value }));
    const newErrors = validationsUpdate({ ...updateUserData, [name]: value });
    setErrors(newErrors);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setUpdateUserData({ name: user.name, lastname: user.lastname });
    setErrors({ name: "", lastname: "" });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validationsUpdate(updateUserData);
    setErrors(validationErrors);
    if (validationErrors.name || validationErrors.lastname) return;

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffb84d",
      cancelButtonColor: "#e74c3c",
      confirmButtonText: "Sí, actualizar",
    });

    if (result.isConfirmed) {
      try {
        const res = await dispatch(updateUser({ id: user._id, ...updateUserData }));
        if (res.payload) {
          setUpdateUserData({
            name: res.payload.name,
            lastname: res.payload.lastname,
          });
          setIsEditing(false);
          Swal.fire("Actualizado", "Tus datos fueron modificados.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Hubo un error al actualizar tus datos.", "error");
      }
    }
  };

  const isSubmitDisabled =
    !!errors.name || !!errors.lastname || !updateUserData.name.trim() || !updateUserData.lastname.trim();

  return (
    <header className={s.profile_card}>
      <div
        style={{
          backgroundImage: `url(${user.picture || ""})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={s.profile_image_upload_wrap}
      ></div>

      <div className={s.profile_card_data}>
        <h2>{updateUserData.name} {updateUserData.lastname}</h2>
        <label className={`${s.profile_card_rol} ${user.role === "admin" ? s.adminRole : s.userRole}`}>
          <RiAdminLine /> {user.role}
        </label>

        <div className={s.profile_card_data_content}>
          <div className={s.profile_card_fields}>
            <span className={s.error_text}>{errors.name}</span>
            <label><FaUserAlt /> Nombre</label>
            <input
              type="text"
              name="name"
              value={updateUserData.name}
              onChange={handleChange}
              placeholder="Nombre..."
              disabled={!isEditing}
            />
          </div>
          <div className={s.profile_card_fields}>
            <span className={s.error_text}>{errors.lastname}</span>
            <label><FaUserAlt /> Apellido</label>
            <input
              type="text"
              name="lastname"
              value={updateUserData.lastname}
              onChange={handleChange}
              placeholder="Apellido..."
              disabled={!isEditing}
            />
          </div>

          <div className={s.profile_card_buttons}>
            {!isEditing ? (
              <button className={s.profile_card_btn} onClick={handleEditClick}>
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleSubmit}
                  className={s.profile_card_btn}
                  disabled={isSubmitDisabled}
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCancel}
                  className={`${s.profile_card_btn} ${s.cancel_btn}`}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
