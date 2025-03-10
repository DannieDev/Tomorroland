const express = require('express');
const router = express.Router();
const { getIndexPage } = require("../controllers/indexController");
const { getBelgicaPage } = require("../controllers/belgicaController");
const { getExperienciaPage } = require("../controllers/experienciaController");
const { getRadioPage } = require("../controllers/radioController");
const authMiddleware = require("../middlewares/authMiddleware");

// Usar el controlador para la página de inicio
router.get("/", getIndexPage);
router.get('/contact', (req, res) => res.render('pages/contact'));

// Estas rutas solo serán accesibles para usuarios registrados
router.get("/belgica", authMiddleware, getBelgicaPage);
router.get("/experience", authMiddleware, getExperienciaPage);
router.get("/radio", authMiddleware, getRadioPage);
router.get('/register', (req, res) => res.render('pages/register'));

module.exports = router;
