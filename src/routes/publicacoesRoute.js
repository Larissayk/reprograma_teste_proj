const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicacoesController");

// Rotas GET
router.get("/", controller.get);
router.get("/mesCriacao/:mes", controller.getPublicacaoPorMes);
router.get("/diaCriacao/:dia", controller.getPublicacaoPorDia);
router.get("/categoria/:categoria", controller.getPorCategoria);
router.get("/autor/:idAutor", controller.getPublicacaoPorIdAutor);
// router.get("/usuario/:nome", controller.getPublicacaoPorNomeUsuario);
router.get("/:id", controller.getPublicacaoPorId);

//Rotas POST
router.post("/post/:id", controller.postPorUsuario);

//Rotas PUT
router.put("/edit/:id", controller.putPublicacaoPorId);

//Rotas DELETE
router.delete("/delete/:id", controller.deletePublicacaoPorId);


module.exports = router;
