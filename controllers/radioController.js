const Radio = require("../models/Radio");

const getRadioPage = async (req, res) => {
    try {
        // Obtener la tarjeta principal del Héroe
        const heroCard = await Radio.findOne({ where: { tipo: "hero" } });

        // Obtener las mini tarjetas debajo del héroe
        const miniCards = await Radio.findAll({ where: { tipo: "mini" } });

        // Obtener los espectáculos a la carta
        const shows = await Radio.findAll({ where: { tipo: "show" } });

          // Obtener los espectáculos mensuales
        const monthlyShows = await Radio.findAll({ where: { tipo: "monthly" } });

        // Si no hay heroCard, asignamos un objeto vacío para evitar errores en la vista
        res.render("pages/radio", { heroCard, miniCards, shows, monthlyShows });

    } catch (error) {
        console.error("Error al obtener la información de la radio:", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getRadioPage };
