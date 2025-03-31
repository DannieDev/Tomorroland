// Solo permitir acceso si el usuario está logueado
function ensureAuthenticated(req, res, next) {
    if (req.session.usuario) {
        return next();
    }
    res.redirect('/auth/login');
}

function ensureAdmin(req, res, next) {
    if (req.session.usuario && req.session.usuario.rol === 'admin') {
        return next();
    }

    res.status(403).render('pages/403', {
        title: 'Acceso Denegado',
        mensaje: 'No tienes permiso para acceder a esta página.'
    });
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
};
