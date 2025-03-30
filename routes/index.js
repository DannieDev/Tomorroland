const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const belgicaController = require("../controllers/belgicaController");
const experienciaController = require("../controllers/experienciaController");
const radioController = require("../controllers/radioController");
const { redirectIfAuthenticated } = require('../middlewares/sessionMiddleware');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

// Página de inicio
router.get("/", homeController.getHomePage);

// Página de contacto
router.get('/contact', (req, res) => res.render('pages/contact'));

// Login
router.get('/login', redirectIfAuthenticated, authController.showLogin);
router.post('/login', authController.login);

// Register
router.get('/register', redirectIfAuthenticated, authController.showRegister);
router.post('/register', authController.register);

// Páginas protegidas
router.get("/belgica", ensureAuthenticated, belgicaController.getBelgicaPage);
router.get("/experience", ensureAuthenticated, experienciaController.getExperienciaPage);
router.get("/radio", ensureAuthenticated, radioController.getRadioPage);

module.exports = router;
