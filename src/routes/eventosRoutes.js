const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventosController");
const authMiddleware = require("../middlewares/auth");

//Rotas POST
router.post("/post/:id", controller.postEventoPorUsuario);
/**
 * @api {post} /eventos/post/:id Adicione um Evento relacionado ao usuário logado
 * @apiName PostEventoPorUsuario
 * @apiGroup Eventos
 *
 * @apiParam {ObjectID} id ID único do evento.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       " message": "Evento incluído com sucesso!"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erro ao criar o evento." 
 *     }
 */




// Rotas GET
router.get("/", controller.getEventos);
/**
 * @api {get} /eventos?query_key=query_value Apresenta todos os registros de eventos, que podem ser filtrados por "status", "categoria" e "prioridade".
 * @apiName GetEventos
 * @apiGroup Eventos
 *
 * @apiParam (query string) {string} status Filtra os resultados pelo status (Ativo, Concluído).
 * @apiParam (query string) {string} categoria Filtra os resultados pela categoria ().
 * @apiParam (query string) {string} prioridade Filtra os resultados pela prioridade (Alta, Média, Baixa).

 *
 * @apiSuccess {ObjectID} _id ID do evento.
 * @apiSuccess {String} titulo  Título do evento.
 * @apiSuccess {String} descricao Breve descrição do evento.
 * @apiSuccess {String} categoria  Categoria do evento.
 * @apiSuccess {String} autor  Usuário que criou o evento.
 * @apiSuccess {String} status  Status do evento ["Ativo", "Concluído"] .
 * @apiSuccess {String} prioridade  Prioridade do evento ["Alta", "Média", "Baixa"].
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Number[]} geolocalizacao Lista com as coordenadas do local onde foi gerado o evento (array de números).
 * @apiSuccess {Object[ref]} comentarios  Lista com as referência dos comentários do evento (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *    {
 *        "_id": "5df443ef723c8d312c564472",
 *        "titulo": "Evento 1",
 *        "descricao": "Descrição teste1",
 *        "categoria": "Teste",
 *        "autor": "5df443ba723c8d312c564470",
 *        "createdAt": "2019-12-14T02:07:43.295Z",
 *        "updatedAt": "2019-12-14T02:08:40.324Z",
 *        "status": "Ativo",
 *        "prioridade": "Média",
 *        "geolocalizacao": [-23.6523345, -46.7110965],
 *        "comentarios": [
 *            "5df44428723c8d312c564474"
 *        ]
 *    }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Não foi possível trazer o registro de eventos." 
 *     }
 */

// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

router.get("/mes/:mes", controller.getEventoPorMes);
/**
 * @api {get} /eventos/mes/:mes Apresenta todos os registros de eventos para o mês escolhido.
 * @apiName GetEventoPorMes
 * @apiGroup Eventos
 *
 * @apiParam {Number} mes Mês do ano (1 - 12).
 *
 * @apiSuccess {ObjectID} _id ID do evento.
 * @apiSuccess {String} titulo  Título do evento.
 * @apiSuccess {String} descricao Breve descrição do evento.
 * @apiSuccess {String} categoria  Categoria do evento.
 * @apiSuccess {String} autor  Usuário que criou o evento.
 * @apiSuccess {String} status  Status do evento ["Ativo", "Concluído"] .
 * @apiSuccess {String} prioridade  Prioridade do evento ["Alta", "Média", "Baixa"].
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Number[]} geolocalizacao Lista com as coordenadas do local onde foi gerado o evento (array de números).
 * @apiSuccess {Object[ref]} comentarios  Lista com as referência dos comentários do evento (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *    {
 *        "_id": "5df443ef723c8d312c564472",
 *        "titulo": "Evento 1",
 *        "descricao": "Descrição teste1",
 *        "categoria": "Teste",
 *        "autor": "5df443ba723c8d312c564470",
 *        "createdAt": "2019-12-14T02:07:43.295Z",
 *        "updatedAt": "2019-12-14T02:08:40.324Z",
 *        "status": "Ativo",
 *        "prioridade": "Média",
 *        "geolocalizacao": [-23.6523345, -46.7110965],
 *        "comentarios": [
 *            "5df44428723c8d312c564474"
 *        ]
 *    }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Não foi possível localizar eventos para esse mês."
 *     }
 */

router.get("/autor/:idAuthor", controller.getEventosPorIdAutor);
/**
 * @api {get} /eventos/autor/:idAuthor Busca os eventos de acordo com o autor (usuário), que podem ser filtrados por "status", "categoria" e "prioridade".
 * @apiName getEventosPorIdAutor
 * @apiGroup Eventos
 *
 * @apiParam {ObjectID} idAuthor ID único do evento.
 * @apiParam (query string) {string} status Filtra os resultados pelo status (Ativo, Concluído).
 * @apiParam (query string) {string} categoria Filtra os resultados pela categoria ().
 * @apiParam (query string) {string} prioridade Filtra os resultados pela prioridade (Alta, Média, Baixa).
 * 
 * @apiSuccess {ObjectID} _id ID do evento.
 * @apiSuccess {String} titulo  Título do evento.
 * @apiSuccess {String} descricao Breve descrição do evento.
 * @apiSuccess {String} categoria  Categoria do evento.
 * @apiSuccess {String} autor  Usuário que criou o evento.
 * @apiSuccess {String} status  Status do evento ["Ativo", "Concluído"] .
 * @apiSuccess {String} prioridade  Prioridade do evento ["Alta", "Média", "Baixa"].
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Number[]} geolocalizacao Lista com as coordenadas do local onde foi gerado o evento (array de números).
 * @apiSuccess {Object[ref]} comentarios  Lista com as referência dos comentários do evento (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *    {
 *        "_id": "5df443ef723c8d312c564472",
 *        "titulo": "Evento 1",
 *        "descricao": "Descrição teste1",
 *        "categoria": "Teste",
 *        "autor": "5df443ba723c8d312c564470",
 *        "createdAt": "2019-12-14T02:07:43.295Z",
 *        "updatedAt": "2019-12-14T02:08:40.324Z",
 *        "status": "Ativo",
 *        "prioridade": "Média",
 *        "geolocalizacao": [-23.6523345, -46.7110965],
 *        "comentarios": [
 *            "5df44428723c8d312c564474"
 *        ]
 *    },
 *    {
 *        "_id": "5df443ef723c8d312c564473",
 *        "titulo": "Evento 2",
 *        "descricao": "Descrição teste2",
 *        "categoria": "Teste",
 *        "autor": "5df443ba723c8d312c564470",
 *        "createdAt": "2019-12-14T02:07:43.295Z",
 *        "updatedAt": "2019-12-14T02:08:40.324Z",
 *        "status": "Ativo",
 *        "prioridade": "Baixo",
 *        "geolocalizacao": [-23.6523345, -46.7110965],
 *        "comentarios": [
 *            "5df44428723c8d312c564475"
 *        ]
 *    }
 * ]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": Erro ao buscar os eventos pelo autor."
 *     }
 */

router.get("/:id", controller.getEventoPorId);
/**
 * @api {get} /eventos/:id Busca as informações de cada evento.
 * @apiName GetEventoPorId
 * @apiGroup Eventos
 *
 * @apiParam {ObjectID} id ID único do evento.
 *
 * @apiSuccess {ObjectID} _id ID do evento.
 * @apiSuccess {String} titulo  Título do evento.
 * @apiSuccess {String} descricao Breve descrição do evento.
 * @apiSuccess {String} categoria  Categoria do evento.
 * @apiSuccess {String} autor  Usuário que criou o evento.
 * @apiSuccess {String} status  Status do evento ["Ativo", "Concluído"] .
 * @apiSuccess {String} prioridade  Prioridade do evento ["Alta", "Média", "Baixa"].
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Number[]} geolocalizacao Lista com as coordenadas do local onde foi gerado o evento (array de números).
 * @apiSuccess {Object[ref]} comentarios  Lista com as referência dos comentários do evento (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *        "_id": "5df443ef723c8d312c564472",
 *        "titulo": "Publicaçao 1",
 *        "descricao": "Descrição teste",
 *        "categoria": "Teste",
 *        "autor": "5df443ba723c8d312c564470",
 *        "createdAt": "2019-12-14T02:07:43.295Z",
 *        "updatedAt": "2019-12-14T02:08:40.324Z",
 *        "status": "Ativo",
 *        "prioridade": "Média",
 *        "geolocalizacao": [-23.6523345, -46.7110965],
 *        "comentarios": [
 *            "5df44428723c8d312c564474"
 *        ]
 *    }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Não foi possível localizar o evento."
 *     }
 */

//Rotas PUT
router.put("/edit/:id", controller.putEventoPorId);
/**
 * @api {put} /eventos/edit/:id Atualiza as informações do evento.
 * @apiName PutEventoPorId
 * @apiGroup Eventos
 *
 * @apiParam {ObjectID} id ID único do evento.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Evento atualizado com sucesso." 
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Erro ao atualizar as informações do evento."
 *     }
 */

//Rotas DELETE
router.delete("/delete/:id", controller.deleteEventoPorId);
/**
 * @api {delete} /eventos/delete/:id Busca o evento pelo ID e o deleta.
 * @apiName DeletePublicacaoPorId
 * @apiGroup Eventos
 *
 * @apiParam {ObjectID} id ID único do evento.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "mensagem": "Evento removido com sucesso!" 
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error""error": "Não foi possível remover o evento."
 *     }
 */

module.exports = router;
