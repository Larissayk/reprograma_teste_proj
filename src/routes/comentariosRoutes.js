const express = require("express");
const router = express.Router();
const controller = require("../controllers/comentariosController");
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

//Rotas GET
router.get("/evento/:id", controller.getComentariosPorEvento);
/**
 * @api {get} /comentarios/evento/:id Busca um comentário e trás o evento a que ele pertence.
 * @apiName GetComentariosPorEvento
 * @apiGroup Comentarios
 *
 * @apiParam {ObjectID} id ID único do comentário.
 *
 * @apiSuccess {ObjectID} _id ID do evento e do comentário.
 * @apiSuccess {String} titulo  Título do evento.
 * @apiSuccess {String} descricao Breve descrição do evento.
 * @apiSuccess {String} categoria  Categoria do evento.
 * @apiSuccess {String} autor  Usuário que criou o evento ou comentário.
 * @apiSuccess {String} texto  Conteúdo do comentário.
 * @apiSuccess {String} status  Status do evento ["Ativo", "Concluído"] .
 * @apiSuccess {String} prioridade  Prioridade do evento ["Alta", "Média", "Baixa"].
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Number[]} geolocalizacao Lista com as coordenadas do local onde foi gerado o evento (array de números).
 * @apiSuccess {Object[ref]} comentarios  Lista com as referência dos comentários do usuário (array de objetos).
 * @apiSuccess {ObjectID} eventosRef Referência do evento ao qual o comentário se refere.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *    "_id": "5deff1cd7ebad052d47c0c61",
 *    "titulo": "Evento Teste",
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
 *            "eventosRef": "5deff1cd7ebad052d47c0c61",
 *            "createdAt": "2019-12-10T19:30:09.721Z",
 *            "updatedAt": "2019-12-10T19:30:09.721Z"
 *        }
 *    ]
 *  }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Erro ao buscar os comentários."
 *     }
 */

router.get("/usuario/:authorId", controller.getComentariosPorUsuario);
/**
 * @api {get} /comentarios/usuario/:authorId Busca os comentários de acordo com o autor (usuário).
 * @apiName GetComentariosPorUsuario
 * @apiGroup Comentarios
 *
 * @apiParam {ObjectID} authorId ID único do usuário.
 *
 * @apiSuccess {ObjectID} _id ID do usuário e do comentário.
 * @apiSuccess {String} nome  Nome do usuário.
 * @apiSuccess {String} email Email do usuário.
 * @apiSuccess {String} password  Password do usuário.
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {String} autor  Usuário que criou o comentário.
 * @apiSuccess {String} texto  Conteúdo do comentário.
 * @apiSuccess {ObjectID} eventosRef Referência do evento ao qual o comentário se refere.
 * @apiSuccess {Object[]} eventos Lista com as referências dos eventos do usuário (array de objetos).
 * @apiSuccess {Object[]} comentarios  Lista com as referência dos comentários do usuário (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "_id": "5df443dc723c8d312c564471",
 *     "nome": "Maria",
 *     "email": "ma@email.com",
 *     "password": "$2a$08$bbpJj7RH/GLlPHhMWHixtOfJuYFWyKdPRladPfEAEzjQ/u20D.Iwm",
 *     "createdAt": "2019-12-14T02:07:24.570Z",
 *     "updatedAt": "2019-12-14T02:08:40.522Z"
 *     "eventos": [],
 *     "comentarios": [
 *         {
 *            "_id": "5df44428723c8d312c564474",
 *             "texto": "comentario Pedro",
 *            "autor": "5df443dc723c8d312c564471",
 *             "eventosRef": "5df443ef723c8d312c564472",
 *             "createdAt": "2019-12-14T02:08:40.006Z",
 *             "updatedAt": "2019-12-14T02:08:40.006Z"
 *         }
 *       ]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Erro ao buscar os comentários pelo autor."
 *     }
 */

//Rotas POST
router.post(
  "/post/:postId/autor/:authorId", controller.postComentarioPorEvento);
  /**
 * @api {post} /comentarios/post/:postId/autor/:authorId Cria um novo comentário no evento.
 * @apiName PostComentarioPorEvento
 * @apiGroup Comentarios
 *
 * @apiParam {ObjectID} postId ID único do evento onde será inserido o comentário.
 * @apiParam {ObjectID} authorId ID único do usuário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "mensagem": "Comentário incluído com sucesso!"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erro ao criar o comentário." 
 *     }
 */

//Rotas PUT
router.put("/edit/:id", controller.updateComentariosPorId);
/**
 * @api {put} /comentarios/edit/:id Atualiza um comentário.
 * @apiName UpdateComentariosPorId
 * @apiGroup Comentarios
 *
 * @apiParam {ObjectID} id ID único do comentário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       mensagem: "Comentário atualizado com sucesso!" 
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erro ao atualizar o comentário."
 *     }
 */

//Rotas DELETE
router.delete("/delete/:id", controller.deleteComentariosPorId);
/**
 * @api {delete} /delete/:id Busca o comentário pelo ID e o deleta.
 * @apiName DeleteComentariosPorId
 * @apiGroup Comentarios
 *
 * @apiParam {ObjectID} id ID único do comentário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "mensagem": "Comentário removido com sucesso!"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erro ao remover o comentário."
 *     }
 */

module.exports = router;
