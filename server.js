// ─────────────────────────────────────────────────────────────
// Importación de Módulos
// ─────────────────────────────────────────────────────────────
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// Middlewares personalizados
const cargarMenu = require('./middlewares/menuMiddleware');
const { exposeUserToViews } = require('./middlewares/sessionMiddleware');
const { ensureAuthenticated, ensureAdmin } = require('./middlewares/authMiddleware');

// Rutas
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const belgicaRoutes = require('./routes/belgica');

// ─────────────────────────────────────────────────────────────
// Inicialización
// ─────────────────────────────────────────────────────────────
const app = express();

// ─────────────────────────────────────────────────────────────
// Configuraciones del Servidor
// ─────────────────────────────────────────────────────────────

// Motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Servir CKEditor desde node_modules
app.use('/ckeditor', express.static(path.join(__dirname, 'node_modules/@ckeditor/ckeditor5-build-classic/build')));

// ─────────────────────────────────────────────────────────────
// Middlewares Globales
// ─────────────────────────────────────────────────────────────

// Formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Método override (PUT, DELETE)
app.use(methodOverride('_method'));

// Sesión y Flash
app.use(session({
    secret: 'Tomorroland_Secret_Password',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(flash());

// Variables de sesión visibles en las vistas
app.use(exposeUserToViews);

// Middleware personalizado para cargar menú dinámico
app.use(cargarMenu);

// Middleware para guardar la última URL antes del login
app.use((req, res, next) => {
    if (!req.session.usuario && !["/auth/login", "/auth/register"].includes(req.path)) {
        req.session.redirectTo = req.originalUrl;
    }
    next();
});

// ─────────────────────────────────────────────────────────────
// Rutas
// ─────────────────────────────────────────────────────────────
app.use('/', mainRoutes);                      // Página pública principal
app.use('/auth', authRoutes);                  // Registro / Login
app.use('/admin/belgica', belgicaRoutes);      // CRUD de sección Bélgica
app.use('/dashboard', ensureAuthenticated, ensureAdmin, dashboardRoutes); // Dashboard protegido
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


// ─────────────────────────────────────────────────────────────
// Página no encontrada (404)
// ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).render('pages/404', {
        title: 'Página no encontrada',
        mensaje: 'Lo sentimos, la página que buscas no existe.'
    });
});

// ─────────────────────────────────────────────────────────────
// Servidor
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
