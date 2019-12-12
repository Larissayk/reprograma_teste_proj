const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentariosController");
const authMiddleware = require("../middlewares/auth");

// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

//Rotas GET
router.get("/publicacao/:id", controller.getComentariosPorPublicacao);
/**
 * @api {get} /comentarios/publicacao/:id Busca o comentário por ID e trás a publicação a que ele pertence.
 * @apiName GetComentariosPorPublicacao
 * @apiGroup Usuários
 *
 * @apiParam {Number} id ID único do usuário.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *    "_id": "5deff1cd7ebad052d47c0c61",
 *    "titulo": "Publicação Teste",
 *    "descricao": "Descrição teste",
 *    "categoria": "Categoria Teste",
 *    "autor": "5ded54c24782da41bc8a52af",
 *    "createdAt": "2019-12-10T19:28:13.364Z",
 *    "updatedAt": "2019-12-10T19:30:10.012Z"
 *    "status": "Ativo",
 *    "prioridade": "Média",
 *    "geolocalizacao": [],
 *    "comentarios": [
 *        {
 *            "_id": "5deff2417ebad052d47c0c66",
 *            "texto": "Comentário Teste",
 *            "autor": "5deff1987ebad052d47c0c5e",
 *            "publicacaoRef": "5deff1cd7ebad052d47c0c61",
 *            "createdAt": "2019-12-10T19:30:09.721Z",
 *            "updatedAt": "2019-12-10T19:30:09.721Z"
 *        }
 *    ]
 *  }
 *
 * @apiError Publicação não encontrada.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Erro ao buscar os comentários."
 *     }
 */

router.get("/usuario/:authorId", controller.getComentariosPorUsuario);

//Rotas POST
router.post(
  "/post/:postId/autor/:authorId",
  controller.postComentarioPorPublicacao
);

//Rotas PUT
router.put("/edit/:id", controller.updateComentariosPorId);

//Rotas DELETE
router.delete("/delete/:id", controller.deleteComentariosPorId);

module.exports = router;
