// Solo permitir acceso si el usuario está logueado
function ensureAuthenticated(req, res, next) {
    if (req.session.usuario) {
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = {
    ensureAuthenticated,
};
