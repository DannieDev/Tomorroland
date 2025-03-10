const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Experiencia = sequelize.define("Experiencia", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boton_texto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: { 
        type: DataTypes.DATE 
    },
    ubicacion: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    boton_info: {
        type: DataTypes.STRING,
        allowNull: false
    },
    boton_registro: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "experiencias",
    timestamps: false
});

module.exports = Experiencia;
