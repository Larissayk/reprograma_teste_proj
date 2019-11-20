const express = require('express');
const router = express.Router();
const controller = require("../controllers/publicacoesController");

// Rotas GET
router.get("/", controller.get);
router.get("/timeStamp/:id", controller.getTimeStampPorId);
router.get("/:categoria", controller.getByCategoria);

//Rotas POST
router.post("/", controller.post);

//Rotas PUT

//Rotas DELETE


module.exports = router;