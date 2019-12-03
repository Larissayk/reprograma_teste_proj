const Comentarios = require("../model/comentarios");
const Usuarios = require("../model/usuarios");
const Publicacoes = require("../model/publicacoes");
const objectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

//GET
//Rota/comentarios/publicacao/:publicacaoId
//Show the comments(from the newest to the oldest) and the post related to them
exports.getComentariosPorPublicacao = (req, res) => {
  const publicacaoId = req.params.postId;
  const publicacao = Publicacoes.findById({ _id: objectId(publicacaoId) })
    .populate({ path: "comentarios", options: { sort: { createdAt: -1 } } })
    .then(resp => console.log(publicacao))
    .catch(err => res.status(404).send("error", err));
};

// exports.getComentariosPorPublicacao = (req, res) => {
//   const publicacaoId = req.params.postId;
//   Publicacoes.findById({ _id: objectId(publicacaoId) })
//     .populate({ path: "comentarios", options: { sort: { createdAt: -1 } } })
//     .exec(function(err, comentarios) {
//       if (err) {
//         return res.status(404).send(err);
//       }
//       res.status(200).send(comentarios);
//     });
// };

//Show only the comments per Post
// exports.getComentariosPorPublicacao = (req, res) => {
//   const publicacaoId = req.params.postId;
//   Comentarios.find({ publicacaoRef: objectId(publicacaoId) }, function(
//     err,
//     comentarios
//   ) {
//     if (err) res.status(500).send(err);
//     if (!comentarios) {
//       return res
//         .status(404)
//         .send({ message: `Não existem comentários para esse post!` });
//     }
//     res.status(200).send(comentarios);
//   });
// };

//Rota/comentarios/usuario/:authorId
//Show comments (from the newest to the oldest) embedded in User object
exports.getComentariosPorUsuario = (req, res) => {
  const usuarioId = req.params.authorId;
  Usuarios.findById({ _id: objectId(usuarioId) })
    .populate({ path: "comentarios", options: { sort: { createdAt: -1 } } })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send(err);
      }
      res.status(200).send(resp);
    })
    .catch(err => res.status(500).json({ error: "erro" }));
};


//Show only the comments per User (newest to the oldest)
// exports.getComentariosPorUsuario = (req, res) => {
//   const usuarioId = req.params.authorId;
//   Comentarios.find({ autor: objectId(usuarioId) })
//     .sort({ createdAt: -1 })
//     .then(resp => {
//       if (resp == 0) {
//         return res
//           .status(404)
//           .send({ message: `Não existem comentários para esse usuário!` });
//       }
//       res.status(200).send(resp);
//     })
//     .catch(err => res.status(500).json({ error: "erro" }));
// };


//POST
//Rota/comentarios/post/:postId/:authorId
//create comments by author in determined Post
exports.postComentarioPorPublicacao = async (req, res) => {
  const publicacaoId = req.params.postId;
  const autorId = req.params.authorId;
  const { texto } = req.body;
  const comentario = await Comentarios.create({
    texto,
    autor: autorId,
    publicacaoRef: publicacaoId
  });
  await comentario.save();

  const publicacaoPorId = await Publicacoes.findById(publicacaoId);
  publicacaoPorId.comentarios.push(comentario);

  const autorPorId = await Usuarios.findById(autorId);
  autorPorId.comentarios.push(comentario);

  publicacaoPorId.save(function(err) {
    if (err) res.status(500).send(err);

    autorPorId.save(function(err) {
      if (err) res.status(500).send(err);

      return res
        .status(201)
        .send({ message: "Comentário incluído com sucesso!" });
    });
  });
};

//PUT
//Rota/comentarios/edit/:id
exports.updateComentariosPorId = (req, res) => {
  const comentarioId = req.params.id;
  Comentarios.findByIdAndUpdate(
    { _id: objectId(comentarioId) },
    { $set: req.body },
    function(err, comentario) {
      if (err) res.status(500).send(err);
      if (!comentario) {
        return res.status(404).send({
          message: `Não foi possível localizar o comentário de ID ${comentario}.`
        });
      }
      res.status(200).send({ mensagem: "Comentário atualizado com sucesso!" });
    }
  );
};

//DELETE
//Rota/comentarios/delete/:id
// Delete the comment and all its references on the User document and Post document
exports.deleteComentariosPorId = (req, res) => {
  const comentarioId = req.params.id;
  Comentarios.findByIdAndDelete({ _id: objectId(comentarioId) }, function(
    err,
    comentario
  ) {
    if (err) res.status(500).send(err);
    if (!comentario) {
      return res.status(404).send({
        message: `Não foi possível localizar o comentário de ID: ${comentarioId}`
      });
    }
    Publicacoes.updateOne(
      { comentarios: objectId(comentarioId) },
      { $pull: { comentarios: objectId(comentarioId) } },
      function(err, publicacao) {
        if (err) res.status(500).send(err);
      }
    );
    Usuarios.updateOne(
      { comentarios: objectId(comentarioId) },
      { $pull: { comentarios: objectId(comentarioId) } },
      function(err, usuario) {
        if (err) res.status(500).send(err);
      }
    );
    res.status(200).send({ mensagem: "Comentário removido com sucesso!" });
  });
};
