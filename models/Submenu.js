const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Submenu = sequelize.define('Submenu', {
    menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING
    },
    orden: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'submenus',
    timestamps: false
});

module.exports = Submenu;
