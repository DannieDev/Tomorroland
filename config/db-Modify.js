const { Sequelize } = require("sequelize");

// Configurar la conexión a MySQL con Sequelize
const sequelize = new Sequelize("database", "user", "port", {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    logging: false,
});

// Verificar conexión
(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
    }
})();

module.exports = sequelize;

//Reenombrar el archivo db-Modify.js a db.js