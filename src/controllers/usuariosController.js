const Usuarios = require("../model/usuarios");
const Publicacoes = require("../model/publicacoes");
const Comentarios = require("../model/comentarios");
const objectId = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const bcryptSalt = 8;

//GET

//Rota/usuarios
//alphabetic order
exports.get = (req, res) => {
  Usuarios.find()
    .sort({ nome: 1 })
    .then(resp => res.status(200).send(resp))
    .catch(err => res.status(500).send(err));
};

// exports.get = (req, res) => {
//   Usuarios.find()
//     .sort({ createdAt: -1 })
//     .exec(function(err, usuarios) {
//       if (err) res.status(500).send(err);
//       res.status(200).send(usuarios);
//     });
// };

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
    return res.status(400).json({ error: "erro" });
  }
};

// exports.getUsuariosPorId = (req, res) => {
//   const usuarioId = req.params.id;
//   Usuarios.find({ _id: usuarioId }, function(err, usuario) {
//     if (err) return res.status(500).send(err);
//     if (!usuario) {
//       return res.status(404).send({
//         message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
//       });
//     }
//     res.status(200).send(usuario);
//   });
// };

//POST

//Rota/usuarios
exports.post = async (req, res) => {
  const { nome, email, password, saldo } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = await bcrypt.hashSync(password, salt);

  const novoUsuario = new Usuarios({
    nome,
    email,
    password: hashPass,
    saldo
  });

  try {
    novoUsuario.save(function(err) {
      if (err) {
        return res.status(500).send({ message: err });
      }
      console.log("Registro salvo!");
    });
    return res.status(201).send({
      mensagem: `Usuário ${novoUsuario.nome} incluído com sucesso!`
    });
  } catch (e) {
    return res.status(401).json({ error: "erro" });
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
    if (!usuario) {
      return res.status(404).send({
        message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
      });
    }
    res.status(200).send({
      status: "ativo",
      mensagem: `Usuário(a) ${usuario.nome} atualizado(a) com sucesso!`
    });
  } catch (e) {
    return res.status(400).json({ error: "erro" });
  }
};

// exports.putUsuarioPorId = (req, res) => {
//   const usuarioId = req.params.id;

//   Usuarios.findByIdAndUpdate(
//     { _id: objectId(usuarioId) },
//     { $set: req.body },
//     function(err, usuario) {
//       if (err) res.status(500).send(err);
//       if (!usuario) {
//         return res.status(404).send({
//           message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
//         });
//       }
//       res.status(200).send({
//         status: "ativo",
//         mensagem: `Usuário(a) ${usuario.nome} atualizado(a) com sucesso!`
//       });
//     }
//   );
// };

//DELETE  - FALTANDO ARRUMAR!!!!!!!
//Rota/usuarios/delete/:id

// Deleto o cadastro do usuário
//Deleto as publicações e comentários do usuário
//Referências dessas publicações e comentários permanecem, mas não retornam nada. Isso é um problema?
exports.deleteUsuarioPorId = (req, res) => {
  const usuarioId = req.params.id;

  Usuarios.findByIdAndDelete({ _id: objectId(usuarioId) }).then(resp => {
    if (resp == 0) {
      return res
        .status(404)
        .send({
          message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
        })
        .catch(err =>
          res.status(500).json({ error: "erro ao deletar o usuário." })
        );
    }
  }),
    Publicacoes.findOneAndDelete({ autor: { $in: objectId(usuarioId) } })
      .then(resp => console.log("Publicação removida com sucesso!"))
      .catch(err =>
        res.status(500).send("Erro ao deletar a publicação do usuário.")
      );

  Comentarios.findOneAndDelete({ autor: { $in: objectId(usuarioId) } })
    .then(resp =>
      res
        .status(200)
        .send(
          `Usuário ${usuario.nome} e seus registros foram excluídos com sucesso!`
        )
    )
    .catch(err => res.status(500).json({ error: "erro" }));
};
