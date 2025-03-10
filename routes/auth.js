const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Usamos Sequelize
const router = express.Router();

// 🔹 Ruta para mostrar el formulario de registro
router.get("/register", (req, res) => {
    res.render("pages/register");
});

// 🔹 Ruta para registrar usuarios en la base de datos con Sequelize
router.post('/register', async (req, res) => {
    const { nombre, apellidos, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.send("Este correo ya está registrado");
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario con Sequelize
        await User.create({ nombre, apellidos, email, password: hashedPassword });
        res.redirect("/auth/login"); // Redirigir al login
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

// 🔹 Ruta para mostrar el formulario de login
router.get("/login", (req, res) => {
    res.render("pages/login");
});

// 🔹 Ruta para iniciar sesión con Sequelize
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.redirect("/login?error=Usuario no encontrado");
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.redirect("/login?error=Contraseña incorrecta");
        }

        // Guardar usuario en sesión
        req.session.usuario = { id: user.id, nombre: user.nombre, email: user.email };
        res.redirect("/");
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el servidor");
    }
});

// 🔹 Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Error al cerrar sesión");
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

module.exports = router;
