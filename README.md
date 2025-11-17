# Tomorroland – Plataforma Web Full-Stack

**Tomorroland** es una plataforma web desarrollada con arquitectura MVC, que integra autenticación, manejo de sesiones, panel de administración, carga de archivos, validaciones y componentes dinámicos para gestionar contenido relacionado con música, experiencias y secciones temáticas.

Este proyecto demuestra habilidades de desarrollo **full-stack**, diseño de APIs, manejo de bases de datos y creación de una aplicación web estructurada y escalable.

## 🚀 Características principales

- Arquitectura **MVC completa** (Model–View–Controller).
- Sistema de **autenticación** con sesiones.
- **Controladores** para gestionar diferentes módulos:  
  - Home  
  - Bélgica  
  - Radio  
  - Experiencia  
  - Dashboard  
- **Rutas protegidas** mediante middlewares personalizados.
- Validación de datos del lado del servidor.
- Subida de archivos con `multer`.
- Plantillas dinámicas mediante un motor de vistas.
- Carpeta pública con assets (CSS, JS, imágenes).
- Gestión de menú, submenú y configuraciones desde base de datos.

## 🧱 Tecnologías utilizadas

### Backend
- Node.js  
- Express.js  
- Sequelize ORM  
- MySQL (puerto 3307)  
- Express-Session  
- Multer  
- Middlewares personalizados  

### Frontend
- HTML5  
- CSS3  
- JavaScript (ES6+)  

### Base de datos
- **MySQL** conectado mediante **Sequelize**

## 📂 Estructura del proyecto
Tomorroland/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── belgicaController.js
│   ├── dashboardController.js
│   ├── experienciaController.js
│   ├── homeController.js
│   └── radioController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── menuMiddleware.js
│   ├── sessionMiddleware.js
│   ├── upload.js
│   └── validationMiddleware.js
├── models/
│   ├── Belgica.js
│   ├── Experiencia.js
│   ├── HeaderConfig.js
│   ├── Home.js
│   ├── Menu.js
│   ├── Radio.js
│   ├── Submenu.js
│   └── User.js
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── routes/
│   ├── auth.js
│   ├── belgica.js
│   ├── dashboard.js
│   └── index.js
├── views/
│   ├── belgica/
│   ├── pages/
│   └── partials/
├── server.js
├── package.json
└── package-lock.json

## 🛠️ Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DannieDev/Tomorroland.git

2. Entra al proyecto:
    cd Tomorroland

3. Instala dependencias:
    npm install

4. Configura la base de datos en:
    config/db.js
   
5. Inicia el servidor:
    npm start o node server.js

6. Visita en tu navegador:
    http://localhost:3000
