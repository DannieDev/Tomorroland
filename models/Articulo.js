const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Articulo = sequelize.define("Articulo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser NULL si no todos los artículos tienen imagen
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    categoria: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "general",
    },
    
}, {
    tableName: "articulos", // Asegura que el nombre de la tabla coincida
    timestamps: false, // Evita que Sequelize agregue `createdAt` y `updatedAt` automáticamente
});

module.exports = Articulo;
