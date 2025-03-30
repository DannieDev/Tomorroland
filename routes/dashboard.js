const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController"); // importación correcta
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", ensureAuthenticated, dashboardController.renderDashboard);


module.exports = router;
