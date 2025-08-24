# 🎮 Videogames Fullstack App

Aplicación **Fullstack** para la gestión y compra de videojuegos.  
El sistema está dividido en dos partes principales:

- **Backend** → API REST en **Spring Boot + MongoDB + JWT**  
- **Frontend** → Aplicación en **React + CSS Modules**

---

## 🚀 Tecnologías Principales
### Backend
- Java 17  
- Spring Boot  
- Spring Security + JWT  
- MongoDB  
- Maven  

### Frontend
- React  
- React Router  
- CSS Modules  
- NPM  

---

## 📂 Estructura del Proyecto
videogames/
├── api/ # Backend (Spring Boot + MongoDB)
├── frontend/ # Frontend (React)
└── README.md # Documentación general del proyecto

yaml
Copiar
Editar

Cada subproyecto tiene su propio `README.md` con detalles específicos.

---

## 🔑 Funcionalidades
### 👤 Usuarios
- Registro y login con **JWT**  
- Cambio de contraseña  

### 🎮 Juegos
- Listado de videojuegos  
- Detalle de cada juego  
- CRUD de juegos (para admin)  

### 🏷 Categorías
- Listado de categorías precargadas  

### 🛒 Carrito y Órdenes
- Agregar/eliminar juegos al carrito  
- Crear órdenes de compra  
- Simulación de pago  

### 🖥 Dashboard (Admin)
- Crear, editar y eliminar juegos  
- Listar usuarios  
- Listar órdenes  

---

## ⚙️ Instalación y Ejecución

### 1. Clonar repositorio
```bash
git clone https://github.com/tuusuario/videogames-app.git
cd videogames-app
2. Backend
bash
Copiar
Editar
cd api
mvn spring-boot:run
👉 API corriendo en: http://localhost:8080

3. Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev
👉 Frontend corriendo en: http://localhost:5173 (Vite) o http://localhost:3000 (CRA)

🔗 Conexión Frontend ↔ Backend
El frontend necesita la URL del backend.
Configurar en un archivo .env dentro de frontend/:

ini
Copiar
Editar
VITE_API_URL=http://localhost:8080
🧪 Tests
Backend
bash
Copiar
Editar
cd api
mvn test
Frontend
bash
Copiar
Editar
cd frontend
npm test
📖 Futuras mejoras
Documentación de la API con Swagger/OpenAPI

Tests unitarios y de integración en backend y frontend

Docker Compose para levantar API + MongoDB + Frontend en un solo paso

Pasarela de pagos real (Stripe, MercadoPago)

Autorización por roles (Admin / User)

👨‍💻 Autor
Proyecto desarrollado por Ezequiel Bamio
Desarrollador Fullstack orientado al Backend (Java + Spring Boot + React)

yaml
Copiar
Editar

---

👉 ¿Querés que te arme también un **Docker Compose** para que con un solo comando levantes `backend + Mongo + frontend`? Eso quedaría muy pro para tu portfolio.