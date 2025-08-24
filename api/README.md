# 🎮 Videogames API

Backend desarrollado con **Spring Boot + MongoDB** para la gestión de videojuegos, categorías, usuarios y órdenes de compra.  
Incluye autenticación con **JWT** y carga automática de datos iniciales.

---

## 🚀 Tecnologías
- Java 17
- Spring Boot
- Spring Security + JWT
- MongoDB
- Maven

---

## 📂 Estructura del Proyecto
- `controllers/` → Controladores REST (Auth, User, Game, Category, Order)
- `services/` → Lógica de negocio
- `repositories/` → Acceso a datos con MongoDB
- `models/` → Entidades de la base de datos
- `dtos/` → Objetos de transferencia de datos
- `config/` → Configuración de MongoDB y carga de datos iniciales

---

## 🔑 Autenticación
La API utiliza **JWT (JSON Web Tokens)**:
- `POST /auth/register` → Registrar un nuevo usuario
- `POST /auth/login` → Iniciar sesión y obtener token
- El token debe enviarse en el header `Authorization: Bearer <token>`

---

## 📌 Endpoints Principales

### 👤 Usuarios
- `GET /users` → Lista todos los usuarios
- `GET /users/{id}` → Obtiene usuario por ID

### 🎮 Juegos
- `GET /games` → Lista todos los juegos
- `POST /games` → Crea un nuevo juego (requiere token)
- `PUT /games/{id}` → Edita un juego
- `DELETE /games/{id}` → Elimina un juego

### 🏷 Categorías
- `GET /categories` → Lista todas las categorías

### 🛒 Órdenes
- `POST /orders` → Crea una nueva orden
- `GET /orders/{id}` → Consulta una orden

---

## ⚙️ Instalación y Ejecución
```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/videogames-api.git
cd videogames-api

# Configurar MongoDB en application.properties
spring.data.mongodb.uri=mongodb://localhost:27017/videogames

# Compilar y ejecutar
mvn spring-boot:run
