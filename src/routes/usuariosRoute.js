const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");

// Rotas GET
router.get("/", controller.get);
router.get("/:id", controller.getUsuariosPorId);

// Rotas POST
router.post("/", controller.post);

//Rotas PUT
router.put("/edit/:id", controller.putUsuarioPorId);

// Rotas DELETE
router.delete("/delete/:id", controller.deleteUsuarioPorId);


module.exports = router;
