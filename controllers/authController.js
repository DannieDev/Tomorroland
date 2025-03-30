const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Mostrar vista de login
const showLogin = (req, res) => {
    res.render("pages/login");
};

// Mostrar vista de registro
const showRegister = (req, res) => {
    res.render("pages/register");
};

// Controlador para registrar usuario
const register = async (req, res) => {
    const { nombre, apellidos, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            nombre,
            apellidos,
            email,
            password: hashedPassword,
        });

        res.redirect("/login");
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).send("Error al registrar el usuario");
    }
};

// Controlador para login (ya lo tenías)
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ where: { email } });

        if (!usuario) {
            return res.status(401).send("Usuario no encontrado");
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
            return res.status(401).send("Contraseña incorrecta");
        }

        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
        };

        res.redirect("/");
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = {
    showLogin,
    login,
    showRegister,
    register,
};
