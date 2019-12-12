const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicacoesController");
const authMiddleware = require("../middlewares/auth");


// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

// Rotas GET
router.get("/", controller.get);
router.get("/mes/:mes", controller.getPublicacaoPorMes);
router.get("/dia/:dia", controller.getPublicacaoPorDia);
// router.get("/categoria/:categoria/", controller.getPorCategoria);
// router.get("/status/:status", controller.getPorStatus);
// router.get("/prioridade/:prioridade", controller.getPorPrioridade);
router.get("/autor/:idAutor", controller.getPublicacaoPorIdAutor);
router.get("/:id", controller.getPublicacaoPorId);

//Rotas POST
router.post("/post/:id", controller.postPorUsuario);

//Rotas PUT
router.put("/edit/:id", controller.putPublicacaoPorId);

//Rotas DELETE
router.delete("/delete/:id", controller.deletePublicacaoPorId);


module.exports = router;
