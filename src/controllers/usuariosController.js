const Usuarios = require("../models/usuarios");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const bcryptSalt = 8;

//GET

//Rota/usuarios
//alphabetic order
exports.getUsuarios = (req, res) => {
  Usuarios.find()
    .sort({ nome: 1 })
    .then(resp => res.status(200).send(resp))
    .catch(err =>
      res
        .status(400)
        .json({ error: "Não foi possível trazer o registro de usuários." })
    );
};

//Rota/usuarios por Id
exports.getUsuariosPorId = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuarios.findOne({ _id: objectId(usuarioId) });

    if (!usuario) {
      return res.status(404).send({
        message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
      });
    }
    res.status(200).send(usuario);
  } catch (e) {
    return res.status(400).json({ error: `Não foi possível localizar o usuário de ID: ${usuarioId}.`
  });
  }
};


//POST
//Rota/usuarios
exports.postUsuario = async (req, res) => {
  const { nome, email, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = await bcrypt.hashSync(password, salt);

  const novoUsuario = new Usuarios({
    nome,
    email,
    password: hashPass
  });

  try {
    novoUsuario.save(function(err) {
      if (err) {
        return res
          .status(500)
          .send({ error: "Erro ao salvar o registro do usuário" });
      }
      console.log("Registro salvo!");
    });
    return res.status(201).send({
      mensagem: `Usuário ${novoUsuario.nome} incluído com sucesso!`
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: "Erro ao salvar o registro do usuário" });
  }
};

//PUT
//Rota/usuarios/edit/:id
exports.putUsuarioPorId = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuarios.findByIdAndUpdate(
      { _id: objectId(usuarioId) },
      { $set: req.body }
    );
    if (usuario == 0) {
      return res.status(404).send({
        error: `Não foi possível localizar o usuário de ID: ${usuarioId}`
      });
    }
    res.status(200).send({
      mensagem: `Usuário(a) ${usuario.nome} atualizado(a) com sucesso!`
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro ao atualizar as informações do usuário." });
  }
};


//DELETE 
//Rota/usuarios/delete/:id
exports.deleteUsuarioPorId = (req, res) => {
  const usuarioId = req.params.id;
  Usuarios.findByIdAndDelete({ _id: objectId(usuarioId) })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
        });
      }
      res.status(200).send({ mensagem: "Usuário excluído com sucesso!" });
    })
    .catch(err =>
      res.status(500).json({ error: "Não foi possível excluir o usuário." })
    );
};
