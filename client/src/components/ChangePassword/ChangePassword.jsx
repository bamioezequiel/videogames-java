import { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { toastInfo, toastSuccess, toastError } from "../../utils/toastOptions";
import s from "./ChangePassword.module.css";

export default function ChangePassword() {
  const [input, setInput] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    toastInfo("🚧 Esta sección está en construcción 🚧");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!input.currentPassword) validationErrors.currentPassword = "La contraseña actual es obligatoria";
    if (!input.password) validationErrors.password = "La nueva contraseña es obligatoria";
    if (!input.confirmPassword) validationErrors.confirmPassword = "Confirmar contraseña es obligatorio";
    if (input.password && input.confirmPassword && input.password !== input.confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toastError("Por favor, corrige los errores antes de continuar");
      return;
    }

    toastSuccess("Formulario listo, sección en construcción");
  };

  const renderIcon = (field) => {
    if (errors[field]) return <span className={s.iconError}>❌</span>;
    if (input[field]) return <span className={s.iconSuccess}>✅</span>;
    return null;
  };

  return (
    <div className={s.container}>
      <div className={s.formWrapper}>
        <div className={s.banner}>
          🚧 Esta sección está en construcción 🚧
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          {["currentPassword", "password", "confirmPassword"].map((field) => (
            <div key={field} className={s.inputGroup}>
              <label className={s.label}>
                {field === "currentPassword"
                  ? "Contraseña Actual"
                  : field === "password"
                  ? "Nueva Contraseña"
                  : "Confirmar Contraseña"}
              </label>
              <div className={s.inputIcon}>
                <input
                  type={showPassword ? "text" : "password"}
                  name={field}
                  value={input[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "currentPassword"
                      ? "Ingrese contraseña actual"
                      : field === "password"
                      ? "Ingrese nueva contraseña"
                      : "Confirme contraseña"
                  }
                  className={`${s.input} ${errors[field] ? s.inputError : ""}`}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className={s.showBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
                <div className={s.fieldIcon}>{renderIcon(field)}</div>
              </div>
              {errors[field] && <span className={s.error}>{errors[field]}</span>}
            </div>
          ))}

          <button type="submit" className={s.submitBtn}>
            Cambiar Contraseña
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
