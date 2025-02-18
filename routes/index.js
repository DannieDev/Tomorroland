const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get('/', (req, res) => res.render('pages/index'));
router.get('/contact', (req, res) => res.render('pages/contact'));

// Estas rutas solo serán accesibles para usuarios registrados
router.get('/belgica', authMiddleware, (req, res) => res.render('pages/belgica'));
router.get('/experience', authMiddleware, (req, res) => res.render('pages/experience'));
router.get('/radio', authMiddleware, (req, res) => res.render('pages/radio'));

router.get('/belgica', (req, res) => res.render('pages/belgica'));
router.get('/register', (req, res) => res.render('pages/register'));

module.exports = router;
