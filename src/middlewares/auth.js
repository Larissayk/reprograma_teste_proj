const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não foi fornecido!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodificado = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decodificado.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido!" });
  }
};
