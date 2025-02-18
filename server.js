const express = require('express');
const path = require('path');

const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Importar rutas
const mainRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use('/', mainRoutes);
app.use('/auth', authRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('pages/404');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
