const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Experiencia = sequelize.define("Experiencia", {
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
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    fecha: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    tipo: {
        type: DataTypes.ENUM("hero", "evento", "noticia"),
        allowNull: false,
    },
    boton_texto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    boton_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    boton_registro: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW // Se actualizará automáticamente en cada modificación
    },
}, {
    tableName: "experiencias",
    timestamps: false, // Sequelize no agregará automáticamente `createdAt` y `updatedAt`
    underscored: true,
});

module.exports = Experiencia;
