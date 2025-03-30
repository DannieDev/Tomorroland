const Home = require("../models/Home"); // Importamos el modelo de artículos

const getHomePage = async (req, res) => {
    try {
        // Obtener el primer artículo (puedes modificarlo si quieres más lógica)
        const home = await Home.findOne();

        // Renderizar la vista index.ejs y pasar el home
        res.render("pages/home", { home });
    } catch (error) {
        console.error("Error al obtener datos: ", error);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getHomePage };
