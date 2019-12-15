const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");
const authMiddleware = require("../middlewares/auth")

    
// Rotas POST
router.post("/", controller.postUsuario);
/**
 * @api {post} /usuarios Cria um novo registro de usuário
 * @apiName PostUsuario
 * @apiGroup Usuarios
 * 
 * @apiParam {String} nome       Nome obrigatório.
 * @apiParam {String} email       Email obrigatório.
 * @apiParam {String} password       Password obrigatório.
 *
 * @apiSuccess {String} nomeUsuario Nome do usuário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "mensagem": `Usuário ${nomeUsuario} incluído com sucesso!`
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Erro ao criar o registro do usuário"
 *     }
 */

// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

// Rotas GET
router.get("/", controller.getUsuarios);
/**
 * @api {get} /usuarios Apresenta todos os registros de usuários.
 * @apiName GetUsuarios
 * @apiGroup Usuarios
 *
 * @apiSuccess {ObjectID} _id ID do usuário.
 * @apiSuccess {String} nome  Nome do usuário.
 * @apiSuccess {String} email Email do usuário.
 * @apiSuccess {String} password  Password do usuário.
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Object[]} eventos Lista com as referências dos eventos do usuário (array de objetos).
 * @apiSuccess {Object[]} comentarios  Lista com as referência dos comentários do usuário (array de objetos).
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "5deff1987ebad052d47c0c5e",
        "nome": "Usuário Teste",
        "email": "usuario@email.com",
        "password": "$2a$08$wz2DGNFv1JjCTr7W0hz.N.Gm.pRcTxB6V.9T0NIMKYT1cLqZRB8i2",
        "createdAt": "2019-12-10T19:27:20.644Z",
        "updatedAt": "2019-12-10T19:30:10.156Z",
         "eventos": [
            "5deff1b97ebad052d47c0c5f"
        ],
        "comentarios": [
            "5deff2417ebad052d47c0c66"
        ],
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Não foi possível trazer o registro de usuários."
 *     }
 */

router.get("/:id", controller.getUsuariosPorId);
/**
 * @api {get} /usuarios/:id Busca as informações de cada usuário.
 * @apiName GetUsuariosPorId
 * @apiGroup Usuarios
 *
 * @apiParam {ObjectID} id ID único do usuário.
 *
 * @apiSuccess {ObjectID} _id ID do usuário.
 * @apiSuccess {String} nome  Nome do usuário.
 * @apiSuccess {String} email Email do usuário.
 * @apiSuccess {String} password  Password do usuário.
 * @apiSuccess {Date} createdAt Data de criação do registro.
 * @apiSuccess {Date} updatedAt  Data da última edição do registro.
 * @apiSuccess {Object[]} eventos Lista com as referências dos eventos do usuário (array de objetos).
 * @apiSuccess {Object[]} comentarios  Lista com as referência dos comentários do usuário (array de objetos).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "5deff1987ebad052d47c0c5e",
        "nome": "Usuário Teste",
        "email": "usuario@email.com",
        "password": "$2a$08$wz2DGNFv1JjCTr7W0hz.N.Gm.pRcTxB6V.9T0NIMKYT1cLqZRB8i2",
        "createdAt": "2019-12-10T19:27:20.644Z",
        "updatedAt": "2019-12-10T19:30:10.156Z",
         "eventos": [
            "5deff1b97ebad052d47c0c5f"
        ],
        "comentarios": [
            "5deff2417ebad052d47c0c66"
        ],
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": `Não foi possível localizar o usuário de ID: ${usuarioId}.`
 *     }
 */

//Rotas PUT
router.put("/edit/:id", controller.putUsuarioPorId);
/**
 * @api {put} /usuarios/edit/:id Atualiza as informações do usuário.
 * @apiName PutUsuarioPorId
 * @apiGroup Usuarios
 *
 * @apiParam {ObjectID} id ID único do usuário.
 *
 * @apiSuccess {String} nomeUsuario Nome do usuário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       mensagem: `Usuário(a) ${nomeUsuario} atualizado(a) com sucesso!`
 *     }
 *
 * @apiError Erro ao atualizar as informações do usuário.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Erro ao atualizar as informações do usuário."
 *     }
 */

// Rotas DELETE
router.delete("/delete/:id", controller.deleteUsuarioPorId);
/**
 * @api {delete} /usuarios/delete/:id Seleciona usuário pelo ID e o deleta.
 * @apiName DeleteUsuarioPorId
 * @apiGroup Usuarios
 *
 * @apiParam {ObjectID} id ID único do usuário.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "mensagem": "Usuário excluído com sucesso!"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error: "Não foi possível excluir o usuário."
 *     }
 */


module.exports = router;
