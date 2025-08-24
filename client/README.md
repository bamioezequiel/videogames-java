# 🎮 Videogames Frontend

Aplicación **Frontend en React** para la gestión y compra de videojuegos.  
Se conecta con el backend de Videogames API (Spring Boot + MongoDB).  
Incluye autenticación con JWT, carrito de compras y dashboard de administración.

---

## 🚀 Tecnologías
- React
- React Router
- CSS Modules
- NPM

---

## 📂 Estructura del Proyecto
- `src/components/` → Componentes principales (Home, Detail, Cart, Dashboard, etc.)
- `src/assets/` → Logos, imágenes y tipografías
- `public/` → Archivos estáticos y `index.html`

---

## 🔑 Funcionalidades
- 🏠 **Home**: Listado de videojuegos destacados.  
- 🔎 **Detalle de juego**: Información detallada de cada videojuego.  
- 🛒 **Carrito de compras**: Añadir, eliminar y simular compra de juegos.  
- 👤 **Usuarios**: Registro, login y cambio de contraseña (con JWT).  
- 🖥 **Dashboard (Admin)**:
  - Crear juegos
  - Listar/editar/eliminar juegos
  - Listar usuarios
  - Listar órdenes
- 💳 **Simulación de pago** con `FakePaymentForm`.

---

## ⚙️ Instalación y Ejecución
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/videogames-frontend.git
cd videogames-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
