import React, { useState } from "react";
import s from "./About.module.css";
import Swal from "sweetalert2";
import { FaUserAlt, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail, MdMessage } from "react-icons/md";

export default function About() {
  const [contact, setContact] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.nombre || !contact.email || !contact.mensaje) {
      Swal.fire({
        icon: "warning",
        title: "Todos los campos son obligatorios",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: `Gracias ${contact.nombre}, te responderemos a ${contact.email}`,
    });

    setContact({ nombre: "", email: "", mensaje: "" });
  };

  const socialLinks = [
    { icon: <MdEmail />, label: "Email", url: "mailto:ezequiel.bamio@gmail.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", url: "https://www.linkedin.com/in/ezequielbamio" },
    { icon: <FaGlobe />, label: "Portfolio", url: "https://bamio.vercel.app" },
  ];

  return (
    <div className={s.about_container}>
      <section className={s.about_section}>
        <h1 className={s.section_title}><FaUserAlt /> Sobre mí</h1>
        <p className={s.about_text}>
          ¡Hola! Soy <strong>Ezequiel Bamio</strong>, desarrollador full-stack apasionado por los videojuegos.
          Este proyecto nació de mi interés por combinar mi amor por el gaming con la programación.
        </p>
        <p className={s.about_text}>
          Inicialmente desarrollé el backend en <strong>Node.js</strong> y luego lo migré a <strong>Java (Spring Boot)</strong> para mejorar la arquitectura y aprender nuevas tecnologías.
          El frontend está hecho con <strong>React, Redux</strong> y estilos modernos, incorporando carrito de compras, filtros, favoritos y autenticación.
        </p>
        <p className={s.about_text}>
          La idea es que los usuarios puedan explorar y descubrir juegos de forma sencilla y divertida.
        </p>

        <div className={s.socials}>
          {socialLinks.map((slink, idx) => (
            <a key={idx} href={slink.url} target="_blank" rel="noreferrer" className={s.social_card}>
              <div className={s.social_icon}>{slink.icon}</div>
              <span className={s.social_label}>{slink.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={s.contact_section}>
        <h2 className={s.section_title}><MdMessage /> Contacto</h2>
        <p className={s.contact_text}>Si querés enviarme un mensaje, completá el formulario:</p>
        <form onSubmit={handleSubmit} className={s.contact_form}>
          <input
            type="text"
            name="nombre"
            value={contact.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className={s.contact_input}
          />
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className={s.contact_input}
          />
          <textarea
            name="mensaje"
            value={contact.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje"
            className={s.contact_textarea}
          />
          <button type="submit" className={s.contact_btn}>Enviar</button>
        </form>
      </section>
    </div>
  );
}
