function redirectIfAuthenticated(req, res, next) {
    //console.log("Middleware redirectIfAuthenticated → sesión:", req.session.usuario);
    if (req.session.usuario) {
        return res.redirect('/');
    }
    next();
}

function exposeUserToViews(req, res, next) {
    res.locals.usuario = req.session.usuario || null;
    next();
}

module.exports = {
    exposeUserToViews,
    redirectIfAuthenticated,
};
