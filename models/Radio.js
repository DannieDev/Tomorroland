const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Radio = sequelize.define("Radio", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    imagen: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: "radio",
    timestamps: false
});

module.exports = Radio;
