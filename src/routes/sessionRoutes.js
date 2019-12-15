const express = require("express");
const router = express.Router();
const controller = require("../controllers/sessionController");

router.post("/", controller.getToken);
/**
 * @api {post} /sessions Gera token de acesso para o usuário.
 * @apiName getToken
 * @apiGroup Sessoes
 *
 * @apiSuccess {ObjectID} _id ID único do usuário.
 * @apiSuccess {String} nome  Nome do usuário.
 * @apiSuccess {String} token  Token de acesso.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "usuario": {
 *        "_id": "5df443dc723c8d312c564471",
 *        "nome": "Usuário teste"
 *    },
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkzXVCJ9.eyJfaWQiOiI1ZGY0NDNkYzcyM2M4ZDMxMmM1NjQ0NzEiLCJpYXQiOjE1NzYzNjEyNTcsImV4cCI6MTU3Njc5MzI1N30.c1OF1KWFsf5c09Rj3xw9sxow17o0weOpoBv53mj0wAI"
 * }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized 
 *     {
 *       "error": "Acesso não autorizado."
 *     }
 */

module.exports = router;