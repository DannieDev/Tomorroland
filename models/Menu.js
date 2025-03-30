const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Submenu = require('./Submenu');

const Menu = sequelize.define('Menu', {
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
    },
    tiene_dropdown: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'menus',
    timestamps: false
});

// Relación con submenús
Menu.hasMany(Submenu, { foreignKey: 'menu_id', as: 'submenus' });
Submenu.belongsTo(Menu, { foreignKey: 'menu_id' });

module.exports = Menu;
