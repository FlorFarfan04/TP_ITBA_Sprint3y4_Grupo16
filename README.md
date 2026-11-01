# TP_ITBA_Sprint5y6_Grupo16
# Mueblería Hermanos Jota

## Integrantes

-	Casaz Candela
-	Farfán Evelyn Florencia

---

## Descripción

Mueblería Hermanos Jota es una aplicación web con React en el frontend y Node.js + Express + MongoDB en el backend.

Permite visualizar un catálogo de productos, consultar el detalle de cada uno, agregarlos a un carrito, enviar un formulario de contacto y administrar productos (crear, editar y eliminar).

El proyecto tiene dos partes independientes que se comunican mediante una API REST:

- client/ → Frontend (React + Vite).
- server/ → Backend (Node.js, Express, Mongoose, MongoDB Atlas).

## Despliegues  

- **Frontend:** https://tp-itba-sprint3y4-grupo16.vercel.app/
- **Backend (API):** https://tp-itba-sprint3y4-grupo16.onrender.com/ 
- **Endpoint de productos:** https://tp-itba-sprint3y4-grupo16.onrender.com/api/productos


---

## Frontend 

Desarrollado con React, Vite y React Router DOM. Consume la API REST del backend para listar, ver, crear, editar y eliminar productos.

### Funcionalidades

- **Catálogo conectado a la API:** `App.jsx` consulta `GET /api/productos` con `fetch` al montarse y pasa productos, estado de carga y error a `Home` y `Catalogo`. `ProductList` los muestra en tarjetas y permite filtrarlos con un buscador.
- **Detalle de producto:** `DetalleProducto` obtiene el `id` con `useParams` y consulta `GET /api/productos/:id`. `ProductDetail` muestra los datos del producto y permite agregarlo al carrito.
- **Alta de productos:** `ProductoForm` es un formulario controlado con `useState` que envía un `POST`. Nombre y precio son obligatorios.
- **Edición:** el mismo formulario, en la ruta con `:id`, carga el producto desde la API, precarga los campos y envía un `PUT`. Se accede con el botón "Editar producto" del detalle.
- **Eliminación:** el botón "Eliminar producto" del detalle pide confirmación en pantalla ("Sí, eliminar" / "Cancelar") antes de enviar el `DELETE`.
- **Carrito:** estado en `App.jsx`; el contador llega al `Navbar` por props.

---

## Backend  [BACKEND]

Desarrollado con Node.js, Express y Mongoose. Los datos se guardan en **MongoDB Atlas** (base `muebleriaJotaDB`, colección `products`).

### Modelo Product

| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | String | Obligatorio |
| `precio` | Number | Obligatorio, no puede ser negativo |
| `destacado` | Boolean | Por defecto `false` |
| `imagen`, `imagenURL`, `medidas`, `materiales`, `acabado`, `descripcion`, `info` | String | Opcionales |
| `stock` | Number | Opcional, no puede ser negativo |
| `createdAt`, `updatedAt` | Date | Automáticos (`timestamps`) |

### Endpoints

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/productos` | Devuelve todos los productos | 200 |
| GET | `/api/productos/:id` | Devuelve un producto por `_id` | 200 / 400 / 404 |
| POST | `/api/productos` | Crea un producto | 201 / 400 |
| PUT | `/api/productos/:id` | Actualiza un producto existente | 200 / 400 / 404 |
| DELETE | `/api/productos/:id` | Elimina un producto | 200 / 400 / 404 |

### Variables de entorno del backend

Crear `server/.env` (no subirlo a GitHub; debe estar en `.gitignore`):

| Variable | Descripción |
|---|---|
| `MONGO_URI` | String de conexión de MongoDB Atlas, con el nombre de la base antes del `?` |
| `PORT` | Opcional. En local usa 3000; Render lo asigna solo. |


MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/muebleriaJotaDB?retryWrites=true&w=majority


---

## Instalación y ejecución en local

Requisitos: Node.js 20.6 o superior y npm.

### Backend

cd server
npm install
# crear server/.env con MONGO_URI
npm run seed
npm run dev # http://localhost:3000

### Frontend

cd client
npm install
npm run dev  # http://localhost:5173 (o en el puerto que indique React/Vite)

Ambos deben estar corriendo a la vez: el proxy de Vite envía las llamadas `/api` al backend en el puerto 3000.

## Tecnologías utilizadas 

**Frontend:** React, Vite, React Router DOM, JavaScript, HTML, CSS.
**Backend:** Node.js, Express, Mongoose, MongoDB Atlas, CORS, Nodemon.
**Despliegue:** Render (backend) y Vercel (frontend).
