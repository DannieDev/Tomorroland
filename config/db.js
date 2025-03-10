const { Sequelize } = require("sequelize");

// Configurar la conexión a MySQL con Sequelize
const sequelize = new Sequelize("tomorroland_db", "dannie", "35946", {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    logging: false, // Desactiva logs de SQL en la consola
});

// Verificar conexión
(async () => {
    try {
        await sequelize.authenticate();
        //console.log("Conectado a la base de datos MySQL con Sequelize");
    } catch (error) {
        //console.error("Error de conexión: ", error);
    }
})();

module.exports = sequelize;
