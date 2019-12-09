const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const Usuarios = require("../model/usuarios");
const bcrypt = require("bcryptjs");

//função para conferir se o password para logar é o mesmo que está cadastrado
function checarPassword(passwordEntry, password) {
  console.log(
    passwordEntry,
    "aqui é o password que o usuario coloca para logar"
  );
  console.log(password, "aqui é o password do BD");
  return bcrypt.compareSync(passwordEntry, password);
}

//Rota GetToken (se a senha de login do usuário for válida, libera token de acesso)
exports.getToken = async (req, res) => {
  const { nomeUsuario, password: passwordEntry } = req.body;
  const usuario = await Usuarios.findOne({nome: nomeUsuario});

  if (!usuario) {
    return res.status(401).json({ error: "Usuário não encontrado!" });
  }

  const { _id, nome, password: hashPass } = usuario;

  //Chama a função para checar o password
  try {
    checarPassword(passwordEntry, hashPass);
  } catch (e) {
    return res.status(401).json({ error: "Password não confere!" });
  }

  try {
    return res.json({
      usuario: { _id, nome },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  } catch (e) {
    return res.status(401).json({ error: "error" });
  }
};
