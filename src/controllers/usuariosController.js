const Usuarios = require("../model/usuarios");
const Publicacoes = require("../model/publicacoes");
const Comentarios = require("../model/comentarios");
const objectId = require("mongodb").ObjectID;

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
exports.post = (req, res) => {
  let usuario = new Usuarios(req.body);

  usuario
    .save()
    .then(resp =>
      res.status(201).send({
        mensagem: `Usuário(a) ${resp.nome} incluído(a) com sucesso!`
      })
    )
    .catch(err => res.status(500).json({ error: "erro" }));
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

//DELETE
//Rota/usuarios/delete/:id
//When I delete user all the posts AND comments related to it gonna be removed as well
exports.deleteUsuarioPorId = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await Usuarios.findByIdAndDelete({
      _id: objectId(usuarioId)
    });
    if (!usuario) {
      return res.status(404).send({
        message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
      });
    }

    Publicacoes.findOneAndDelete(
      { autor: { $in: objectId(usuarioId) } },
      function(err) {
        if (err)
          res
            .status(500)
            .send("Erro ao deletar as publicações associadas ao usuário.");
      },
      console.log(
        "Certifica-se de que qualquer publicação associada ao usuário também seja excluída."
      )
    );

    Comentarios.findOneAndDelete(
      { autor: { $in: objectId(usuarioId) } },
      function(err) {
        if (err)
          res
            .status(500)
            .send("Erro ao deletar os comentários associadas ao usuário.");
      },
      console.log(
        "Certifica-se de que qualquer comentário associado ao usuário seja excluído também."
      )
    );

    await Publicacoes.findOneAndUpdate(
      { comentarios: { $in: { autor: objectId(usuarioId) } } },
      { $pull: { comentarios: { $in: { autor: objectId(usuarioId) } } } },
      function(err) {
        if (err)
          res
            .status(500)
            .send(
              "Erro ao deletar as referências dos comentários nas publicações."
            );
      },
      console.log(
        "Certifica-se de que qualquer referência de comentário do usuário também seja excluído das publicações."
      )
    );

    return res
      .status(200)
      .send(
        `Usuário ${usuario.nome} e todas as publicações associadas a ele foram excluídos com sucesso!`
      );
  } catch (e) {
    return res.status(400).json({ error: "erro" });
  }
};

// exports.deleteUsuarioPorId = (req, res) => {
//   const usuarioId = req.params.id;
//   Usuarios.findByIdAndDelete({ _id: objectId(usuarioId) }, function(
//     err,
//     usuario
//   ) {
//     if (err) res.status(500).send(err);
//     if (!usuario) {
//       return res.status(404).send({
//         message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
//       });
//     }
//     Publicacoes.findOneAndRemove(
//       { autor: { $in: objectId(usuarioId) } },
//       function(err, publicacao) {
//         if (err) res.status(500).send(err);
//       }
//     );
//     res
//       .status(200)
//       .send(
//         `Usuário ${usuario.nome} e todas as publicações associadas a ele foram excluídos com sucesso!`
//       );
//   });
// };
