module.exports = (req, res, next) => {
    res.locals.usuario = req.session.usuario || null; // Permite acceder a `usuario` en EJS
    next();
};
