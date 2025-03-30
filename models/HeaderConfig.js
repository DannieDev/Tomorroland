const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HeaderConfig = sequelize.define('HeaderConfig', {
    logo_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo_alt: {
        type: DataTypes.STRING,
        defaultValue: 'Logo Tomorrowland'
    },
    logo_link: {
        type: DataTypes.STRING,
        defaultValue: '/'
    }
}, {
    tableName: 'configuracion_header',
    timestamps: false
});

module.exports = HeaderConfig;
