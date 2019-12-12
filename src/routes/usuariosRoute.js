const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosController");
const authMiddleware = require("../middlewares/auth")

    
// Rotas POST
router.post("/", controller.post);

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {post} /usuarios Request User information
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiUse UserNotFoundError
 */


// router.use(authMiddleware) //tudo que estiver abaixo, precisa de token.

// Rotas GET
router.get("/", controller.get);
router.get("/:id", controller.getUsuariosPorId);

//Rotas PUT
router.put("/edit/:id", controller.putUsuarioPorId);

// Rotas DELETE
router.delete("/delete/:id", controller.deleteUsuarioPorId);


module.exports = router;
