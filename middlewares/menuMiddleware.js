const Menu = require('../models/Menu');
const HeaderConfig = require('../models/HeaderConfig');

async function cargarMenu(req, res, next) {
    try {
        const menuItems = await Menu.findAll({
            where: { activo: true },
            order: [['orden', 'ASC']],
            include: {
                association: 'submenus',
                where: { activo: true },
                required: false,
                order: [['orden', 'ASC']]
            }
        });

        res.locals.menuItems = menuItems;
        next();
    } catch (error) {
        console.error('Error al cargar el menú:', error);
        res.locals.menuItems = [];
        next();
    }
}

async function cargarMenu(req, res, next) {
    try {
        const menuItems = await Menu.findAll({
            where: { activo: true },
            order: [['orden', 'ASC']],
            include: {
                association: 'submenus',
                where: { activo: true },
                required: false,
                order: [['orden', 'ASC']]
            }
        });

        const headerConfig = await HeaderConfig.findByPk(1); // Solo hay una fila

        res.locals.menuItems = menuItems;
        res.locals.headerConfig = headerConfig;

        next();
    } catch (error) {
        console.error('Error al cargar el menú y header:', error);
        res.locals.menuItems = [];
        res.locals.headerConfig = null;
        next();
    }
}

module.exports = cargarMenu;