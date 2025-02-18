const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('pages/index'));
router.get('/contact', (req, res) => res.render('pages/contact'));
router.get('/experience', (req, res) => res.render('pages/experience'));
router.get('/radio', (req, res) => res.render('pages/radio'));
router.get('/belgica', (req, res) => res.render('pages/belgica'));
router.get('/register', (req, res) => res.render('pages/register'));

module.exports = router;
