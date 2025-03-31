const express = require("express");
const router = express.Router();
const belgicaController = require("../controllers/belgicaController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Mostrar todos los registros
router.get("/", ensureAuthenticated, ensureAdmin, belgicaController.listar);

// Mostrar formulario de creación
router.get("/create", ensureAuthenticated, ensureAdmin, belgicaController.formCrear);

// Procesar nuevo registro
router.post("/", ensureAuthenticated, ensureAdmin, upload.single("imagen"), belgicaController.crear);

// Mostrar formulario de edición
router.get("/edit/:id", ensureAuthenticated, ensureAdmin, belgicaController.formEditar);

// Procesar edición
router.put("/:id", ensureAuthenticated, ensureAdmin, upload.single("imagen"), belgicaController.actualizar);

// Eliminar un registro
router.post("/delete/:id", ensureAuthenticated, ensureAdmin, belgicaController.eliminar);

module.exports = router;
