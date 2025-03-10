const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Belgica = sequelize.define("Belgica", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    imagen: { type: DataTypes.STRING },
    fecha_evento: { type: DataTypes.DATE },
    estado: { type: DataTypes.ENUM("disponible", "agotado"), allowNull: false, defaultValue: "disponible" },
    tipo: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: "belgica",
    timestamps: false
});

module.exports = Belgica;
