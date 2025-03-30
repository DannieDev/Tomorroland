const express = require("express");
const router = express.Router();
const belgicaController = require("../controllers/belgicaController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Mostrar todos los registros
router.get("/", ensureAuthenticated, belgicaController.listar);

// Mostrar formulario de creación
router.get("/create", ensureAuthenticated, belgicaController.formCrear);

// Procesar nuevo registro
router.post("/", ensureAuthenticated, upload.single("imagen"), belgicaController.crear);

// Mostrar formulario de edición
router.get("/edit/:id", ensureAuthenticated, belgicaController.formEditar);

// Procesar edición
router.put("/:id", ensureAuthenticated, upload.single("imagen"), belgicaController.actualizar);

// Eliminar un registro
router.post("/delete/:id", ensureAuthenticated, belgicaController.eliminar);

module.exports = router;
