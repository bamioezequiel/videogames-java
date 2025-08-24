import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGame,
  updateGame,
  getDetailGame,
  getAllGames,
} from "../../../redux/actions/gameActions";
import { validationsCreateGame } from "../../../utils/validations";
import AdminNav from "../AdminNav/AdminNav";
import s from "./CreateGame.module.css";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Opciones base de toast
const baseOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  closeButton: true,
};

export default function CreateGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms) || [];
  const tags = useSelector((state) => state.tags) || [];
  const genres = useSelector((state) => state.genres) || [];
  const detailGame = useSelector((state) => state.detailGame) || {};

  const currentDate = new Date().toISOString().split("T")[0];

  const initialInputState = {
    name: "",
    description: "",
    released: currentDate,
    mainImage: "",
    shortScreenshots: ["", "", "", "", "", "", ""],
    price: 0,
    onSale: 0,
    featured: false,
    isNew: true,
    active: true,
    platforms: [],
    genres: [],
    tags: [],
  };

  const [input, setInput] = useState(initialInputState);
  const [errors, setErrors] = useState({});

  // Cargar detalle si es edición
  useEffect(() => {
    if (id) dispatch(getDetailGame(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && Object.keys(detailGame).length) {
      setInput({
        name: detailGame.name || "",
        description: detailGame.description || "",
        released: detailGame.released || currentDate,
        mainImage: detailGame.mainImage || "",
        shortScreenshots: Array(7)
          .fill("")
          .map((_, i) => detailGame.shortScreenshots?.[i] || ""),
        price: detailGame.price || 0,
        onSale: detailGame.onSale || 0,
        featured: detailGame.featured || false,
        isNew: detailGame.isNew ?? true,
        active: detailGame.active ?? true,
        platforms: detailGame.platforms || [],
        genres: detailGame.genres || [],
        tags: detailGame.tags || [],
      });
    } else {
      setInput(initialInputState);
      setErrors({});
    }
  }, [id, detailGame]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setInput((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheck = (e, type) => {
    const { name: value, checked } = e.target;
    setInput((prev) => {
      const list = prev[type] || [];
      if (checked) {
        if (!list.includes(value)) return { ...prev, [type]: [...list, value] };
      } else {
        return { ...prev, [type]: list.filter((item) => item !== value) };
      }
      return prev;
    });
    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const handleImageChange = (e, index) => {
    const value = e.target.value;
    setInput((prev) => {
      const newScreenshots = [...prev.shortScreenshots];
      newScreenshots[index] = value;
      return { ...prev, shortScreenshots: newScreenshots };
    });
    setErrors((prev) => ({ ...prev, shortScreenshots: "" }));
  };

  const validateBeforeSubmit = () => {
    const validationErrors = validationsCreateGame(input);
    setErrors(validationErrors);

    Object.entries(validationErrors).forEach(([key, val]) => {
      if (val) toast.error(`${key}: ${val}`, baseOptions);
    });

    return Object.values(validationErrors).every((v) => !v || v.length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateBeforeSubmit()) return;

    const priceNum = Number(input.price);
    const onSaleNum = Number(input.onSale);

    const priceWithSale =
      onSaleNum > 0 ? (priceNum * (1 - onSaleNum / 100)).toFixed(2) : priceNum;

    const game = {
      ...input,
      mainImage: input.shortScreenshots.filter(Boolean)[0],
      shortScreenshots: input.shortScreenshots.filter(Boolean),
      price: priceNum,
      onSale: onSaleNum,
      priceWithSale: Number(priceWithSale),
    };

    try {
      if (id) {
        await dispatch(updateGame(id, game));
        await dispatch(getAllGames());
        Swal.fire("¡Éxito!", "El juego fue actualizado correctamente.", "success");
      } else {
        await dispatch(createGame(game));
        await dispatch(getAllGames());
        Swal.fire("¡Éxito!", "El juego fue creado correctamente.", "success");
      }
      navigate("/dashboard/games");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al enviar los datos.", baseOptions);
    }
  };

  const handleReset = () => {
    setInput(initialInputState);
    setErrors({});
    toast.info("Formulario reiniciado", baseOptions);
  };

  return (
    <div className={s.createGame_container}>
      <AdminNav />
      <form className={s.createGame_form_container} onSubmit={handleSubmit}>
        <ToastContainer />

        <div className={s.form_input_group}>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Nombre del juego..."
            className={s.form_input}
          />
        </div>

        <div className={s.form_input_group}>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={input.price}
            onChange={handleChange}
            min={0}
            className={s.form_input}
          />
        </div>

        <div className={s.form_input_group}>
          <label>Descuento (%)</label>
          <input
            type="number"
            name="onSale"
            value={input.onSale}
            onChange={handleChange}
            min={0}
            max={100}
            className={s.form_input}
          />
        </div>

        <div className={s.form_input_group}>
          <label>Fecha de lanzamiento</label>
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={handleChange}
            max={currentDate}
            className={s.form_input}
          />
        </div>

        <div className={s.form_input_group}>
          <label>Destacado</label>
          <input
            type="checkbox"
            name="featured"
            checked={input.featured}
            onChange={handleChange}
          />
        </div>
        <div className={s.form_input_group}>
          <label>Nuevo</label>
          <input
            type="checkbox"
            name="isNew"
            checked={input.isNew}
            onChange={handleChange}
          />
        </div>
        <div className={s.form_input_group}>
          <label>Activo</label>
          <input
            type="checkbox"
            name="active"
            checked={input.active}
            onChange={handleChange}
          />
        </div>

        <div className={s.form_textarea_group}>
          <label>Descripción</label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            className={s.form_textarea}
            placeholder="Descripción del juego..."
          />
        </div>

        <div className={s.form_images_group}>
          <label>Imágenes</label>
          {input.shortScreenshots.map((img, i) => (
            <div key={i} className={s.image_card}>
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(e, i)}
                placeholder={`Imagen ${i + 1}`}
                className={s.form_input}
              />
              {img && <img src={img} alt={`preview ${i + 1}`} />}
            </div>
          ))}
        </div>

        <div className={s.form_labels_container}>
          <div className={s.form_checkbox_group}>
            <label>Plataformas ({input.platforms.length})</label>
            <div className={s.form_labels}>
              {platforms.map((p) => (
                <div key={p} className={s.form_label}>
                  <input
                    type="checkbox"
                    name={p}
                    checked={input.platforms.includes(p)}
                    onChange={(e) => handleCheck(e, "platforms")}
                  />
                  <label>{p}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={s.form_checkbox_group}>
            <label>Géneros ({input.genres.length})</label>
            <div className={s.form_labels}>
              {genres.map((g) => (
                <div key={g} className={s.form_label}>
                  <input
                    type="checkbox"
                    name={g}
                    checked={input.genres.includes(g)}
                    onChange={(e) => handleCheck(e, "genres")}
                  />
                  <label>{g}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={s.form_checkbox_group}>
            <label>Etiquetas ({input.tags.length})</label>
            <div className={s.form_labels}>
              {tags.map((t) => (
                <div key={t} className={s.form_label}>
                  <input
                    type="checkbox"
                    name={t}
                    checked={input.tags.includes(t)}
                    onChange={(e) => handleCheck(e, "tags")}
                  />
                  <label>{t}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.form_buttons_group}>
          <button type="button" onClick={handleReset} className={s.form_btn}>
            Reiniciar
          </button>
          <button type="submit" className={s.form_btn}>
            {id ? "Actualizar juego" : "Crear juego"}
          </button>
        </div>
      </form>
    </div>
  );
}
