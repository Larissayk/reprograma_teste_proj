const Usuarios = require("../model/usuarios");
const Publicacoes = require("../model/publicacoes");
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
exports.getUsuariosPorId = (req, res) => {
  const usuarioId = req.params.id;
  Usuarios.findOne({ _id: objectId(usuarioId) })
    // .then(resp => {
    //   if (!resp) {
    //     return res.status(404).send({
    //       message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
    //     });
    //   }
    // })
    .then(resp => res.status(200).send(resp))
    .catch(err => res.status(500).send(err));
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
    .catch(err => res.status(500).send(err));
};

//PUT
//Rota/usuarios/edit/:id
// exports.putUsuarioPorId = async (req, res) => {
//   const usuarioId = req.params.id;
//   try {
//     const usuario = await Usuarios.findByIdAndUpdate(
//       { _id: objectId(usuarioId) },
//       { $set: req.body }
//     )
//     return res.status(200).send({
//       status: "ativo",
//       mensagem: `Usuário(a) atualizado(a) com sucesso!`
//     })
//   } catch (e) {
//     res.status(500).send(err);
//   }
// };

exports.putUsuarioPorId = (req, res) => {
  const usuarioId = req.params.id;

  Usuarios.findByIdAndUpdate({ _id: objectId(usuarioId) }, { $set: req.body })
    // .then(resp => {
    //   if (!resp) {
    //     return res.status(404).send({
    //       message: `Não foi possível localizar o usuário de ID: ${usuarioId}`
    //     });
    //   }
    // })
    .then(resp =>
      res.status(200).send({
        status: "ativo",
        mensagem: `Usuário(a) ${resp.nome} atualizado(a) com sucesso!`
      })
    )
    .catch(err => res.status(500).send(err));
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
//When I delete user all the posts related to it gonna be removed as well
exports.deleteUsuarioPorId = (req, res) => {
  const usuarioId = req.params.id;
  Usuarios.findByIdAndDelete({ _id: objectId(usuarioId) })
    // .catch(err => {
    //   if (!usuario) {
    //     return res.status(404).send({
    //       error: `Não foi possível localizar o usuário de ID: ${usuarioId}`
    //     });
    //   }
    // })
    .then(() =>
      Publicacoes.findOneAndRemove({ autor: { $in: objectId(usuarioId) } })
    )
    .then(resp =>
      res
        .status(200)
        .send(
          `Usuário ${resp.nome} e todas as publicações associadas a ele foram excluídos com sucesso!`
        )
    )
    .catch(err => res.status(500).send(err));
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
