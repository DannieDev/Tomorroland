const express = require('express');
const path = require('path');
const session = require("express-session");
const globalMiddleware = require("./middlewares/global");


const app = express();

// Configuración de sesiones
app.use(session({
    secret: "Tomorroland_Secret_Password",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Middleware Global
app.use(globalMiddleware);

// Importar Middlewares
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

// Aplicar Middlewares Globales
app.use(sessionMiddleware);


// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para recordar la última página visitada antes de login
app.use((req, res, next) => {
    if (!req.session.usuario && !["/auth/login", "/auth/register"].includes(req.path)) {
        req.session.redirectTo = req.originalUrl;
    }
    next();
});

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde `public/`
app.use(express.static(path.join(__dirname, 'public')));

// Importar Rutas
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use('/', mainRoutes);
app.use('/auth', authRoutes);

// Middleware para proteger rutas privadas
app.use('/dashboard', authMiddleware);

// 🔹 Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('pages/404');
});

// Iniciar el Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor corriendo en http://localhost:${PORT}`));
