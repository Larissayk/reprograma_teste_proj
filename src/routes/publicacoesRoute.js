const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicacoesController");

// Rotas GET
router.get("/", controller.get);
router.get("/mesCriacao/:mes", controller.getPublicacaoPorMes);
router.get("/diaCriacao/:dia", controller.getPublicacaoPorDia);
router.get("/categoria/:categoria", controller.getPorCategoria);
router.get("/:id", controller.getPublicacaoPorId);
//fazer rota para buscar publicação por usuário;
// router.get("/timeStamp/:id", controller.getTimeStampPorId);

//Rotas POST
router.post("/", controller.post);

//Rotas PUT
router.put("/edit/:id", controller.putPublicacaoPorId);

//Rotas DELETE
router.delete("/delete/:id", controller.deletePublicacaoPorId);

module.exports = router;
