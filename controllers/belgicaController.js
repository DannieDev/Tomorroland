const Belgica = require("../models/Belgica");
const path = require("path");
const fs = require("fs");


// Mostrar todos los registros (dashboard)
exports.listar = async (req, res) => {
    try {
        const registros = await Belgica.findAll({ order: [["id", "ASC"]] });

        const success_msg = req.flash('success_msg')?.[0] || null;
        const danger_msg = req.flash('danger_msg')?.[0] || null;

        const rutaUploads = path.join(__dirname, "..", "public", "uploads");
        const rutaImg = path.join(__dirname, "..", "public", "img");

        registros.forEach(registro => {
            const nombreImagen = (registro.imagen || "").trim().replace(/^\/?(img|uploads)\//, "");
            const imagenEnUploads = path.join(rutaUploads, nombreImagen);
            const imagenEnImg = path.join(rutaImg, nombreImagen);

            if (nombreImagen && fs.existsSync(imagenEnUploads)) {
                registro.rutaImagen = "/uploads/" + nombreImagen;
            } else if (nombreImagen && fs.existsSync(imagenEnImg)) {
                registro.rutaImagen = "/img/" + nombreImagen;
            } else {
                registro.rutaImagen = null;
            }
        });

        res.render("belgica/index", {
            registros,
            success_msg,
            danger_msg
        });

    } catch (error) {
        console.error("Error al listar Bélgica:", error);
        res.status(500).send("Error al listar registros.");
    }
};

// Mostrar formulario de creación
exports.formCrear = (req, res) => {
    res.render("belgica/create");
};

// Crear nuevo registro
exports.crear = async (req, res) => {
    try {
        const sanitizeHtml = require("sanitize-html");

        const { titulo, tipo, estado, url } = req.body;

        const descripcion = sanitizeHtml(req.body.descripcion, {
            allowedTags: ["p", "strong", "em", "b", "i", "br", "ul", "ol", "li", "a"],
            allowedAttributes: {
                a: ['href']
            }
        });

        const imagen = req.file ? req.file.filename : null;

        let fecha_evento = null;
        if (["boletos", "hero_fechas"].includes(tipo)) {
            fecha_evento = req.body.fecha_evento || null;
        }

        // Validación
        if (!tipo || !titulo) {
            return res.status(400).send("Tipo y Título son obligatorios.");
        }

        await Belgica.create({
            titulo,
            descripcion: descripcion || null,
            imagen,
            fecha_evento,
            estado: estado || 'disponible',
            tipo,
            url: url || null
        });

        req.flash('success_msg', 'Datos Ingresados Exitosamente');
        return res.redirect("/admin/belgica");

    } catch (error) {
        console.error("Error al crear registro:", error);
        return res.status(500).send("Error al crear registro.");
    }
};

// Mostrar formulario de edición
exports.formEditar = async (req, res) => {
    try {
        const registro = await Belgica.findByPk(req.params.id);
        if (!registro) return res.status(404).send("Registro no encontrado");

        res.render("belgica/edit", { registro });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        res.status(500).send("Error al cargar formulario.");
    }
};

// Actualizar registro
exports.actualizar = async (req, res) => {
    try {
        const sanitizeHtml = require("sanitize-html");
        const id = req.params.id;
        const registro = await Belgica.findByPk(id);
        if (!registro) {
            return res.status(404).send("Registro no encontrado");
        }

        const { titulo, descripcion, fecha_evento, estado, url } = req.body;
        const tipo = registro.tipo;

        if (["titulo", "nav", "boletos", "hero_fechas", "descubrir", "eventos"].includes(tipo)) {
            registro.titulo = titulo || registro.titulo;
        }

        if (["boletos", "hero_fechas", "descubrir", "eventos"].includes(tipo)) {
            registro.descripcion = sanitizeHtml(descripcion || '', {
                allowedTags: ["p", "strong", "em", "b", "i", "br", "ul", "ol", "li", "a"],
                allowedAttributes: { a: ['href'] }
            });
        }

        if (["boletos", "hero_fechas", "eventos"].includes(tipo)) {
            registro.fecha_evento = fecha_evento || null;
        }

        if (["boletos"].includes(tipo)) {
            registro.estado = estado || 'disponible';
        }

        if (["nav", "descubrir"].includes(tipo)) {
            registro.url = url || null;
        }

        if (req.file) {
            if (registro.imagen) {
                const oldPath = path.join(__dirname, "..", "public", "uploads", registro.imagen);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            registro.imagen = req.file.filename;
        }

        await registro.save();

        req.flash('success_msg', 'Datos actualizados exitosamente');
        res.redirect("/admin/belgica");

    } catch (error) {
        console.error("Error al actualizar registro:", error);
        res.status(500).send("Error al actualizar registro.");
    }
};


// Eliminar registro
exports.eliminar = async (req, res) => {
    try {
        const registro = await Belgica.findByPk(req.params.id);
        if (!registro) return res.status(404).send("Registro no encontrado");

        if (registro.imagen) {
            const imagePath = path.join(__dirname, "..", "public", "uploads", registro.imagen);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await registro.destroy();

        // Flash mensaje de eliminación
        req.flash('danger_msg', 'Datos eliminados correctamente');
        res.redirect("/admin/belgica");

    } catch (error) {
        console.error("Error al eliminar registro:", error);
        res.status(500).send("Error al eliminar registro.");
    }
};


// Página pública de Bélgica
exports.getBelgicaPage = async (req, res) => {
    try {
        const navContent = await Belgica.findAll({
            where: {
                tipo: "nav",
                estado: "disponible"
            },
            order: [["id", "ASC"]]
        });


        const tituloPrincipal = await Belgica.findOne({ where: { tipo: "titulo" } });

        const fechas = await Belgica.findAll({
            where: {
                tipo: ["fecha", "hero_fechas"] // ← acepta ambos
            }
        });

        const boletos = await Belgica.findAll({
            where: {
                tipo: ["boletos", "boleto"] // ← acepta ambos
            }
        });

        const descubrir = await Belgica.findAll({ where: { tipo: "descubrir" } });

        const rutaUploads = path.join(__dirname, "..", "public", "uploads");
        const rutaImg = path.join(__dirname, "..", "public", "img");

        const agregarRutaImagen = (registros) => {
            registros.forEach(registro => {
                const nombreImagen = (registro.imagen || "").trim().replace(/^\/?(img|uploads)\//, "");
                const imagenEnUploads = path.join(rutaUploads, nombreImagen);
                const imagenEnImg = path.join(rutaImg, nombreImagen);

                if (nombreImagen && fs.existsSync(imagenEnUploads)) {
                    registro.rutaImagen = "/uploads/" + nombreImagen;
                } else if (nombreImagen && fs.existsSync(imagenEnImg)) {
                    registro.rutaImagen = "/img/" + nombreImagen;
                } else {
                    registro.rutaImagen = null;
                }
            });
        };

        agregarRutaImagen(navContent);
        agregarRutaImagen(fechas);
        agregarRutaImagen(boletos);
        agregarRutaImagen(descubrir);

        res.render("pages/belgica", {
            tituloPrincipal,
            navContent,
            fechas,
            boletos,
            descubrir,
        });

    } catch (error) {
        console.error("Error al cargar página Bélgica:", error);
        res.status(500).send("Error al cargar contenido.");
    }
};

