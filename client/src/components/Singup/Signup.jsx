import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCheckCircle, BsXCircle, BsEye, BsEyeSlash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthContext";
import s from "./Signup.module.css";

import { handleValidationSignup, toastOptions } from "../../utils/validations";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = handleValidationSignup(input);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      toast.error("Por favor corrige los errores.", toastOptions);
      return;
    }

    setLoading(true);
    try {
      await register(input);

      Swal.fire({
        icon: "success",
        title: "¡Cuenta creada con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al crear la cuenta",
        toastOptions
      );
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (field) =>
    errors[field] ? (
      <BsXCircle color="var(--color-red)" />
    ) : input[field] ? (
      <BsCheckCircle color="var(--color-green)" />
    ) : null;

  return (
    <>
      <div className={s.signup_container}>
        <div className={s.signup_content}>
          <h2 className={s.signup_title}>Crear Cuenta</h2>
          <p className={s.signup_subtitle}>
            Completa el formulario para comenzar
          </p>

          <form onSubmit={handleSubmit} className={s.signup_form} noValidate>
            {/* Campos */}
            {["name", "lastname", "email"].map((field) => (
              <div key={field} className={s.signup_form_input_container}>
                <label className={s.signup_form_label}>
                  {renderIcon(field)}
                  {field === "name"
                    ? "Nombre"
                    : field === "lastname"
                    ? "Apellido"
                    : "Correo"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={input[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name"
                      ? "Tu nombre"
                      : field === "lastname"
                      ? "Tu apellido"
                      : "Correo electrónico"
                  }
                  className={`${s.signup_form_input} ${
                    errors[field] ? s.input_error : ""
                  }`}
                  autoComplete="off"
                  required
                />
                {errors[field] && (
                  <span className={s.signup_error}>{errors[field]}</span>
                )}
              </div>
            ))}

            {/* Contraseña con ver/ocultar */}
            <div className={s.signup_form_input_container}>
              <label className={s.signup_form_label}>
                {renderIcon("password")} Contraseña
              </label>
              <div className={s.password_wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className={`${s.signup_form_input} ${
                    errors.password ? s.input_error : ""
                  }`}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={s.show_password_btn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              {errors.password && (
                <span className={s.signup_error}>{errors.password}</span>
              )}
            </div>

            <button type="submit" className={s.signup_btn} disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <p className={s.signup_alreadyAccount}>
            ¿Ya tienes una cuenta?{" "}
            <NavLink to="/login" className={s.signup_link}>
              Iniciar sesión
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
