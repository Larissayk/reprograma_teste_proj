const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

// Rotas GET
router.get("/", controller.get);
router.get("/:id", controller.getUsuariosPorId);


// Rotas POST
router.post("/", controller.post);

//Rotas PUT


// Rotas DELETE


module.exports = router;