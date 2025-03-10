const Articulo = require("../models/Articulo"); // Importamos el modelo de artículos

const getIndexPage = async (req, res) => {
    try {
        // Obtener el primer artículo (puedes modificarlo si quieres más lógica)
        const articulo = await Articulo.findOne();

        // Renderizar la vista index.ejs y pasar el artículo
        res.render("pages/index", { articulo });
    } catch (error) {
        console.error("Error al obtener datos: ", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getIndexPage };
