const express = require('express');
const router = express.Router();
const controller = require("../controllers/publicacoesController");

// Rotas GET

//Rotas POST
router.post("/", controller.post);

//Rotas PUT

//Rotas DELETE


module.exports = router;