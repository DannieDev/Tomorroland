module.exports = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect("/auth/login"); // Si no está autenticado, redirigir al login
    }
    next();
};
