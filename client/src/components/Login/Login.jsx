import { useState } from "react";
import { BsCheckCircle, BsXCircle, BsDashCircle } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import s from "./Login.module.css";

import { handleValidationLogin } from "../../utils/validations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuthContext();

  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const updatedInput = { ...input, [e.target.name]: e.target.value };
    setInput(updatedInput);
    setErrors(handleValidationLogin(updatedInput));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = handleValidationLogin(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Por favor, corrige los errores antes de continuar.");
      return;
    }

    const res = await login(input);
    if (res.success) {
      toast.success("¡Inicio de sesión exitoso!");
      navigate("/");
    } else {
      setErrors({ general: res.message });
      toast.error(res.message || "Login fallido");
    }
  };

  const renderIcon = (field) => {
    if (!input[field]) return <BsDashCircle color="#888" />;
    return errors[field] ? <BsXCircle color="var(--color-red)" /> : <BsCheckCircle color="var(--color-green)" />;
  };

  return (
    <div className={s.login_container}>
      <div className={s.login_content}>
        <h2 className={s.login_title}>Iniciar Sesión</h2>
        <p className={s.login_subtitle}>Ingresa tus datos para acceder</p>
        <hr className={s.login_line} />

        {errors.general && (
          <div className={s.login_general_error}>
            {errors.general}
          </div>
        )}

        <form className={s.login_form} onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div key={field} className={s.login_form_input_container}>
              <label htmlFor={field} className={s.login_form_label}>
                {renderIcon(field)} {field === "email" ? "Correo electrónico" : "Contraseña"}
              </label>
              <input
                id={field}
                type={field}
                name={field}
                value={input[field]}
                onChange={handleChange}
                placeholder={field === "email" ? "Correo..." : "Contraseña..."}
                className={`${s.login_form_input} ${errors[field] ? s.input_error : s.input_success}`}
                autoComplete={field === "email" ? "username" : "current-password"}
                required
              />
              {errors[field] && <span className={s.login_error}>{errors[field]}</span>}
            </div>
          ))}

          <button type="submit" className={s.login_btn} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <button
            type="button"
            className={s.login_btn_without_background}
            onClick={() => navigate("/forgot-password")}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>

        <hr className={s.login_line} />
        <span className={s.login_text_register}>¿No tienes cuenta?</span>
        <NavLink to="/signup" className={s.login_btn_without_background}>
          Registrarse
        </NavLink>
      </div>
      <ToastContainer />
    </div>
  );
}
