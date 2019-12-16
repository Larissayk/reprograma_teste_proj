const Comentarios = require("../models/comentarios");
const Usuarios = require("../models/usuarios");
const Eventos = require("../models/eventos");
const objectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");

//GET
//Rota/comentarios/publicacao/:publicacaoId
//Show the comments(from the newest to the oldest) and the post related to them
exports.getComentariosPorEvento = (req, res) => {
  const eventoId = req.params.id;
  Eventos.findById({ _id: objectId(eventoId) })
    .populate({ path: "comentarios", options: { sort: { createdAt: -1 } } })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send("Não foi possível encontrar o evento");
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res.status(500).json({ error: "Erro ao buscar os comentários." })
    );
};

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
        return res.status(404).send("Não foi possível encontrar o usuário.");
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Erro ao buscar os comentários pelo autor." })
    );
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
exports.postComentarioPorEvento = async (req, res) => {
  const eventoId = req.params.postId;
  const autorId = req.params.authorId;
  const { texto } = req.body;
  const comentario = await Comentarios.create({
    texto,
    autor: autorId,
    publicacaoRef: eventoId
  });

  try {
    const eventoPorId = await Eventos.findById(eventoId);
    await eventoPorId.comentarios.push(comentario);

    eventoPorId.save(function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("Referência do comentário incluída no evento");
    });
  } catch (e) {
    return res.status(400).json({ error: "erro" });
  }

  try {
    const autorPorId = await Usuarios.findById(autorId);
    await autorPorId.comentarios.push(comentario);

    autorPorId.save(function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("Referência do comentário incluída no usuário.");
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro ao incluir referência." });
  }

  try {
    comentario.save(function(err) {
      if (err) {
        return res.status(500).send({ error: "Erro ao salvar o comentário." });
      }
      console.log("The file was saved!");
    });
    return res.status(201).send({
      mensagem: `Comentário incluído com sucesso!`
    });
  } catch (e) {
    return res.status(401).json({ error: "Erro ao criar comentário" });
  }
};

//PUT
//Rota/comentarios/edit/:id
exports.updateComentariosPorId = (req, res) => {
  const comentarioId = req.params.id;
  Comentarios.findByIdAndUpdate(
    { _id: objectId(comentarioId) },
    { $set: req.body }
  )
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar o comentário de ID ${comentarioId}.`
        });
      }
      res.status(200).send({ mensagem: "Comentário atualizado com sucesso!" });
    })
    .catch(err =>
      res.status(500).json({ error: "Erro ao atualizar o comentário." })
    );
};

//DELETE
//Rota/comentarios/delete/:id
// Delete the comment
exports.deleteComentariosPorId = (req, res) => {
  const comentarioId = req.params.id;
  Comentarios.findByIdAndDelete({ _id: objectId(comentarioId) })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar o comentário de ID: ${comentarioId}`
        });
      }
      res.status(200).send({ mensagem: "Comentário removido com sucesso!" });
    })
    .catch(err =>
      res.status(500).json({ error: "Erro ao remover o comentário." })
    );
};
