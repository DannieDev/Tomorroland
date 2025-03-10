module.exports = (req, res, next) => {
    res.locals.navItems = [
        { titulo: "Inicio", url: "/" },
        { titulo: "Festival y Eventos", url: "#", subItems: [
            { titulo: "Tomorrowland Bélgica", url: "/belgica" },
            { titulo: "Invierno de Tomorrowland", url: "#" },
            { titulo: "Tomorrowland Brasil", url: "#" },
            { titulo: "Tomorrowland Presenta", url: "#" }
        ]},
        { titulo: "Música", url: "#", subItems: [
            { titulo: "One World Radio", url: "/radio" },
            { titulo: "Tomorrowland Music", url: "#" },
            { titulo: "Tomorrowland Academy", url: "#" },
            { titulo: "One World Artists", url: "#" }
        ]},
        { titulo: "Experiencias", url: "/experience" },
        { titulo: "Tienda", url: "#" },
        { titulo: "Más", url: "/mas" },
        { titulo: "Contacto", url: "/contact" }
    ];

    res.locals.socialLinks = [
        { icon: "fab fa-facebook-f", url: "#" },
        { icon: "fab fa-instagram", url: "#" },
        { icon: "fab fa-x-twitter", url: "#" },
        { icon: "fab fa-youtube", url: "#" },
        { icon: "fab fa-tiktok", url: "#" },
        { icon: "fab fa-discord", url: "#" }
    ];

    res.locals.usuario = req.session.usuario || null;

    next();
};
