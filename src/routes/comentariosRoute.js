const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentariosController");

//Rotas GET
router.get("/publicacao/:postId", controller.getComentariosPorPublicacao);
router.get("/usuario/:authorId", controller.getComentariosPorUsuario);

//Rotas POST
router.post("/post/:postId/autor/:authorId", controller.postComentarioPorPublicacao);

//Rotas PUT
router.put("/edit/:id", controller.updateComentariosPorId);

//Rotas DELETE
router.delete("/delete/:id", controller.deleteComentariosPorId);

module.exports = router;