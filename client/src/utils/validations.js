import { toast } from "react-toastify";

// -------------------------
// Opciones de Toast
// -------------------------
export const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

// -------------------------
// Validación para crear o actualizar juegos
// -------------------------
export const validationsCreateGame = (input) => {
  const errors = {
    name: "",
    description: "",
    released: "",
    price: "",
    onSale: "",
    stock: "",
    featured: "",
    isNew: "",
    platforms: "",
    genres: "",
    tags: "",
    shortScreenshots: "",
  };

  const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/i;

  // Nombre
  if (!input.name) errors.name = "El nombre es obligatorio";
  else if (input.name.length > 255) errors.name = "Máximo 255 caracteres";

  // Descripción
  if (!input.description) errors.description = "La descripción es obligatoria";
  else if (input.description.length > 2500)
    errors.description = "Máximo 2500 caracteres";

  // Precio
  if (input.price === "" || input.price === null) errors.price = "El precio es obligatorio";
  else if (input.price < 0 || input.price > 10000)
    errors.price = "El precio debe estar entre 0 y 10000";

  // Oferta
  if (input.onSale === "" || input.onSale === null) errors.onSale = "El descuento es obligatorio";
  else if (input.onSale < 0 || input.onSale > 100)
    errors.onSale = "El descuento debe estar entre 0% y 100%";

  // Imágenes
  const images = input.shortScreenshots || [];
  if (!images[0] || !imageRegex.test(images[0])) {
    errors.shortScreenshots = "Se requiere al menos la primera imagen válida (jpg, gif, png)";
  } else {
    for (let i = 1; i < images.length; i++) {
      if (images[i] && !imageRegex.test(images[i])) {
        errors.shortScreenshots = `La imagen ${i + 1} no es válida`;
        break;
      }
    }
  }

  // Limites de arrays
  if (input.tags.length > 40) errors.tags = "Máximo 40 etiquetas";
  if (input.genres.length > 40) errors.genres = "Máximo 40 géneros";
  if (input.platforms.length > 30) errors.platforms = "Máximo 30 plataformas";

  return errors;
};

// -------------------------
// Validación Login
// -------------------------
export const handleValidationLogin = (input) => {
  const errors = {};
  const { email, password } = input;

  if (!email) errors.email = "El correo es obligatorio";
  if (!password) errors.password = "La contraseña es obligatoria";

  return errors;
};

// -------------------------
// Validación Signup
// -------------------------
export const handleValidationSignup = (input) => {
  const errors = {};
  const { name, lastname, email, password } = input;

  if (!name || name.length < 3) errors.name = "El nombre debe tener al menos 3 caracteres";
  if (!lastname || lastname.length < 3) errors.lastname = "El apellido debe tener al menos 3 caracteres";
  if (!email) errors.email = "El correo es obligatorio";
  if (!password || password.length < 8) errors.password = "La contraseña debe tener al menos 8 caracteres";

  return errors;
};

// -------------------------
// Validación de actualización de usuario
// -------------------------
export const validationsUpdate = (input) => {
  const errors = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    picture: "",
    dateBirth: "",
  };

  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^\d{10,}$/;

  if (!input.firstname) errors.firstname = "El nombre es obligatorio";
  else if (input.firstname.length > 255) errors.firstname = "Máximo 255 caracteres";

  if (!input.lastname) errors.lastname = "El apellido es obligatorio";
  else if (input.lastname.length > 255) errors.lastname = "Máximo 255 caracteres";

  if (!emailRegex.test(input.email)) errors.email = "Correo inválido";

  if (!phoneRegex.test(input.phone)) errors.phone = "El teléfono debe tener al menos 10 dígitos";

  if (!input.dateBirth) errors.dateBirth = "La fecha de nacimiento es obligatoria";
  else if (new Date(input.dateBirth).getFullYear() > new Date().getFullYear() - 13)
    errors.dateBirth = "Debes tener más de 13 años";

  return errors;
};
