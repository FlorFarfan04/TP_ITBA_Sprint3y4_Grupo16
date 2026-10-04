# TP_ITBA_Sprint3y4_Grupo16

Mueblería Hermanos Jota
Integrantes
Casaz Candela
Farfán Evelyn Florencia
________________________________________
Descripción
Mueblería Hermanos Jota es una aplicación web desarrollada con React en el frontend y Node.js + Express en el backend.
La aplicación permite visualizar un catálogo de productos, consultar el detalle de cada producto, agregar productos a un carrito de compras y enviar un formulario de contacto.
El proyecto está dividido en dos partes independientes:
•	client/ → Frontend desarrollado con React.
•	server/ → Backend desarrollado con Node.js y Express.
Ambas partes se ejecutan en servidores y puertos diferentes y se comunican mediante una API REST.
________________________________________
📁 Arquitectura del proyecto
muebleria-hermanos-jota/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── estilos.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
└── server/
    ├── data/
    │   └── productos.js
    ├── routes/
    │   └── productos.routes.js
    ├── index.js
    ├── package.json
    └── ...

Frontend
El frontend está desarrollado con React y utiliza componentes para dividir la interfaz en partes reutilizables.
Los principales componentes son:
•	Navbar: navegación y contador de productos del carrito.
•	Footer: pie de página.
•	ProductCard: muestra la información resumida de un producto.
•	ProductList: obtiene y renderiza la lista de productos.
•	ProductDetail: muestra la información detallada de un producto.
•	ContactForm: formulario de contacto controlado mediante useState.
El carrito de compras se maneja como estado en App.js y el contador se comunica al componente Navbar mediante props.
Los productos se obtienen mediante una petición fetch al backend.
________________________________________
Backend
El backend está desarrollado con Node.js y Express.
Los productos se almacenan inicialmente en un archivo JavaScript local (data/productos.js) como un array de objetos.
La API cuenta con las siguientes rutas:
GET /api/productos
GET /api/productos/:id
El backend también utiliza:
•	express.json() para procesar futuras peticiones con JSON.
•	CORS para permitir la comunicación con el frontend.
•	Un middleware de logging para registrar método y URL de cada petición.
•	express.Router() para organizar las rutas.
•	Un manejador de rutas inexistentes (404).
•	Un manejador centralizado de errores.
________________________________________
Instalación y ejecución
Requisitos
•	Node.js
•	npm
________________________________________
Backend
Desde una terminal, ingresar a la carpeta del backend:
cd server
Instalar las dependencias:
npm install
Iniciar el servidor:
npm run dev
El backend se ejecuta en:
http://localhost:3000
________________________________________
Frontend
Abrir otra terminal e ingresar a la carpeta del frontend:
cd client
Instalar las dependencias:
npm install
Iniciar el servidor de desarrollo:
npm run dev
El frontend se ejecuta en el puerto indicado por React/Vite al iniciar el servidor, por ejemplo:
http://localhost:5173
El frontend y el backend deben estar ejecutándose simultáneamente para que la aplicación pueda obtener los productos desde la API.
________________________________________
Comunicación entre Frontend y Backend
El frontend realiza peticiones HTTP al backend para obtener los productos.
Por ejemplo:
fetch("http://localhost:3000/api/productos")
El backend responde los productos en formato JSON y React utiliza esa información para renderizar la interfaz.
La utilización de CORS permite que el frontend pueda realizar peticiones al backend aunque ambos se encuentren ejecutándose en diferentes puertos.
________________________________________
Decisiones tomadas
Separación de Frontend y Backend
Se decidió separar el proyecto en las carpetas client y server para mantener diferenciadas las responsabilidades de la interfaz y la lógica del servidor.
Componentización en React
La interfaz se dividió en componentes independientes para facilitar la reutilización, organización y mantenimiento del código.
API REST
Los productos son proporcionados por el backend mediante endpoints REST en lugar de estar definidos directamente dentro de los componentes de React.
Estado del carrito
El carrito se mantiene como estado en App.js, permitiendo compartir la información necesaria con otros componentes mediante props.
Formulario controlado
El formulario de contacto utiliza useState para mantener el estado de sus campos y controlar sus valores desde React.
Manejo de estados de carga y error
Al obtener los productos mediante fetch, se contemplan estados de carga y error para mejorar el comportamiento de la aplicación ante diferentes situaciones.
Datos locales
Para esta etapa del proyecto, los productos se almacenan en un archivo JavaScript local. Esto permite trabajar con la API sin necesidad de incorporar una base de datos.
________________________________________
Tecnologías utilizadas
Frontend
•	React
•	JavaScript
•	HTML
•	CSS
Backend
•	Node.js
•	Express
•	CORS
•	Nodemon
