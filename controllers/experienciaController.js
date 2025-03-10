const Experiencia = require("../models/Experiencia"); // Importamos el modelo de la tabla experiencias

const getExperienciaPage = async (req, res) => {
    try {
        // Obtener la sección principal (Hero Section)
        const heroSection = await Experiencia.findOne({
            where: { tipo: "hero" },
            attributes: ["titulo", "descripcion", "imagen", "boton_texto"]
        });

        // Obtener los eventos
        const eventos = await Experiencia.findAll({
            where: { tipo: "evento" },
            attributes: ["titulo", "descripcion", "imagen", "fecha", "ubicacion", "boton_info", "boton_registro"]
        });

        // Obtener la sección de noticias
        const noticias = await Experiencia.findAll({
            where: { tipo: "noticia" },
            attributes: ["titulo", "descripcion", "imagen"]
        });

        res.render("pages/experience", { heroSection, eventos, noticias });

    } catch (error) {
        console.error("Error al obtener experiencias: ", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getExperienciaPage };
