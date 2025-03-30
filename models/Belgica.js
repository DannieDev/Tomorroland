const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Belgica = sequelize.define('Belgica', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    fecha_evento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'agotado'),
        defaultValue: 'disponible',
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    url: {
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
    }
}, {
    tableName: 'belgica',
    timestamps: false,
});

module.exports = Belgica;
