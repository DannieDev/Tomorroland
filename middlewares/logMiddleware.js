module.exports = (req, res, next) => {
    console.log(`📌 Ruta visitada: ${req.originalUrl} - Usuario: ${req.session.usuario ? req.session.usuario.email : "No autenticado"}`);
    next();
};
