const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Radio = sequelize.define("Radio", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    titulo: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    imagen: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
    url: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW // Se actualizará automáticamente en cada modificación
    }
}, {
    tableName: "radio",
    timestamps: false,
    underscored: true,
});

module.exports = Radio;
