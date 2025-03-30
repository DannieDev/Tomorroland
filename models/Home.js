const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Home = sequelize.define("Home", {
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
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW, // Esto asegurará que se actualice automáticamente
    }
    
}, {
    tableName: "home", // Asegura que el nombre de la tabla coincida
    timestamps: false, // Evita que Sequelize agregue `createdAt` y `updatedAt` automáticamente
    underscored: true, // Evita que Sequelize convierta el nombre de la tabla a plural
});

module.exports = Home;
