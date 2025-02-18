const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../config/db"); // Conexión a MySQL
const router = express.Router();

// 🔹 Ruta para mostrar el formulario de registro
router.get("/register", (req, res) => {
    res.render("pages/register");
});

// 🔹 Ruta para registrar usuarios en la base de datos
router.post('/register', async (req, res) => {
    const { nombre, apellidos, email, password } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
        }
        
        if (results.length > 0) {
            return res.send('Este correo ya está registrado');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        db.query(
            'INSERT INTO usuarios (nombre, apellidos, email, password) VALUES (?, ?, ?, ?)',
            [nombre, apellidos, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error en el servidor');
                }
                res.redirect('/auth/login'); // Redirigir al login después del registro exitoso
            }
        );
    });
});

// 🔹 Ruta para mostrar el formulario de login
router.get("/login", (req, res) => {
    res.render("pages/login");
});

// 🔹 Ruta para iniciar sesión
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (results.length === 0) {
            return res.redirect("/login?error=Usuario no encontrado");
        }

        // Comparar contraseñas
        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.redirect("/login?error=Contraseña incorrecta");
        }

        // Guardar usuario en sesión
        req.session.usuario = { id: user.id, nombre: user.nombre, email: user.email };

        res.redirect("/");

        
    });
});

// 🔹 Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie("connect.sid"); // Asegurar que la sesión sea eliminada
        res.redirect('/'); // ✅ Redirigir al index tras cerrar sesión
    });
});


module.exports = router;
