const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");
const authMiddleware = require("../middlewares/auth")

// Rotas POST
router.post("/", controller.post);

// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

// Rotas GET
router.get("/", controller.get);
router.get("/:id", controller.getUsuariosPorId);

//Rotas PUT
router.put("/edit/:id", controller.putUsuarioPorId);

// Rotas DELETE
router.delete("/delete/:id", controller.deleteUsuarioPorId);


module.exports = router;
