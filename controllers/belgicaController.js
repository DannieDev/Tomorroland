const Belgica = require("../models/Belgica"); // Importamos el modelo de la nueva tabla

const getBelgicaPage = async (req, res) => {
    try {
        // Obtener el título principal
        const tituloPrincipal = await Belgica.findOne({ where: { tipo: "bienvenida" } });

        // Obtener los elementos del menú de navegación junto con su URL
        const navItems = await Belgica.findAll({ where: { tipo: "nav" }, attributes: ["titulo", "url"] });

        // Obtener las fechas de los fines de semana
        const fechas = await Belgica.findAll({ where: { tipo: "hero_fechas" } });

        // Obtener los boletos
        const boletos = await Belgica.findAll({ where: { tipo: "boletos" }, attributes: ["titulo", "descripcion", "fecha_evento", "estado"]});

        const descubrir = await Belgica.findAll({ where: { tipo: "descubrir" }, attributes: ["titulo", "descripcion", "imagen", "url"]});

        // Obtener los eventos
        const eventos = await Belgica.findAll({ where: { tipo: "eventos" } });

        res.render("pages/belgica", { tituloPrincipal, navItems, fechas, eventos, boletos, descubrir });

    } catch (error) {
        console.error("Error al obtener datos: ", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getBelgicaPage };