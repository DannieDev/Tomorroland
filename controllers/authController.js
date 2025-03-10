const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controlador para el login
const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Buscar usuario en la base de datos con Sequelize
        const usuario = await User.findOne({ where: { email } });
        
        if (!usuario) {
            return res.status(401).send("Usuario no encontrado");
        }
        
        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        
        if (!passwordMatch) {
            return res.status(401).send("Contraseña incorrecta");
        }
        
        // Autenticación exitosa, guardar datos en la sesión
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

module.exports = { login };