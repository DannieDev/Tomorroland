module.exports = {
    //Validacion de Registro
    validarRegistro: (req, res, next) => {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.redirect("/auth/register?error=Todos los campos son obligatorios");
        }

        if (password.length < 6) {
            return res.redirect("/auth/register?error=La contraseña debe tener al menos 6 caracteres");
        }

        next();
    },
    //Validacion de Login
    validarLogin: (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.redirect("/auth/login?error=Todos los campos son obligatorios");
        }

        next();
    }
};
