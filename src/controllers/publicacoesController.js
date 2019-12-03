const Publicacoes = require("../model/publicacoes");
const Usuarios = require("../model/usuarios");
const objectId = require("mongodb").ObjectID;

//GET
//Rota/publicacoes
//from the newest to the oldest
exports.get = (req, res) => {
  Publicacoes.find()
  .sort({createdAt: -1})
  .then(resp => res.status(200).send(resp))
  .catch(err => res.status(500).json({error: erro}))
};

//Rota/publicacoes/:id
exports.getPublicacaoPorId = (req, res) => {
  const publicacaoId = req.params.id;
  Publicacoes.find({ _id: objectId(publicacaoId) })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar a publicação de ID: ${publicacaoId}`
        });
      }
      res.status(200).send(resp);
    })
    .catch(err => res.status(500).json({ error: erro }));
};

//Rota/publicações/:categoria
//from the newest to the oldest
exports.getPorCategoria = (req, res) => {
  const categoriaPublicacao = req.params.categoria;
  console.log(categoriaPublicacao);
  Publicacoes.find({ categoria: categoriaPublicacao })
    .sort({ createdAt: -1 })
    .then(resp => res.status(200).send(resp))
    .catch(err => res.status(500).json({ error: erro }));
};


//Rota/publicacoes/mesCriacao/:mes
exports.getPublicacaoPorMes = (req, res) => {
  const mesPublicacao = parseInt(req.params.mes);
  console.log(mesPublicacao);
  Publicacoes.find(
    {
      $expr: {
        $eq: [{ $month: "$createdAt" }, mesPublicacao]
      }
    },
    function(err, publicacao) {
      if (err) res.status(500).send(err);
      // console.log(publicacao)
      res.status(200).send(publicacao);
    }
  );
};

//Rota/publicacoes/diaCriacao/:dia
exports.getPublicacaoPorDia = (req, res) => {
  const diaPublicacao = parseInt(req.params.dia);
  console.log(diaPublicacao);
  Publicacoes.find(
    {
      $expr: {
        $eq: [{ $dayOfMonth: "$createdAt" }, diaPublicacao]
      }
    },
    function(err, publicacao) {
      if (err) res.status(500).send(err);
      // console.log(publicacao)
      res.status(200).send(publicacao);
    }
  );
};

//Rota/publicações/autor/:idAutor
//from the newest to the oldest
exports.getPublicacaoPorIdAutor = (req, res) => {
  const usuarioId = req.params.idAutor;
  Publicacoes.find({ autor: objectId(usuarioId)}).sort({createdAt: -1}).exec(function(err, publicacao) {
    if (err) res.status(500).send(err);
    if (!publicacao) {
      return res.status(404).send({
        message: "Não foi possível localizar a publicação desse usuário."
      });
    }

    res.status(200).send(publicacao);
  });
};


//POST
//Rota/publicacoes/:id
//add Post per UserId
exports.postPorUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const { titulo, descricao, categoria, valor } = req.body;
  const publicacao = await Publicacoes.create({
    titulo,
    descricao,
    categoria,
    valor,
    autor: usuarioId
  });
  await publicacao.save();

  const usuarioPorId = await Usuarios.findById(usuarioId);

  usuarioPorId.publicacoes.push(publicacao);
  await usuarioPorId.save(function(err) {
    if (err) res.status(500).send(err);

    return res.status(201).send({ message: "Post incluído com sucesso!" });
  });
};

//exports.post = (req, res) => {
// let publicacao = new Publicacoes(req.body);
// const id = req.params.id;

// publicacao.save(function(err) {
//   if (err) res.status(500).send(err);

//   res.status(201).send({
//     mensagem: "Post incluído com sucesso!"
//   });
// });
//};

//PUT
//Rota/publicacoes/edit/:id
exports.putPublicacaoPorId = (req, res) => {
  const publicacaoId = req.params.id;

  Publicacoes.findByIdAndUpdate(
    { _id: objectId(publicacaoId) },
    { $set: req.body },
    function(err, publicacao) {
      if (err) res.status(500).send(err);
      if (!publicacao) {
        return res.status(404).send({
          message: `Não foi possível localizar a publicação de ID: ${publicacaoId}`
        });
      }

      res.status(200).send({
        mensagem: `Publicação atualizada com sucesso!`
      });
    }
  );
};

//DELETE
//Rota/publicacoes/delete/:id
//When I delete the post, its reference also is removed from the User

exports.deletePublicacaoPorId = (req, res) => {
  const publicacaoId = req.params.id;
  Publicacoes.findByIdAndDelete({ _id: objectId(publicacaoId) }, function(
    err,
    publicacao
  ) {
    if (err) res.status(500).send(err);
    if (!publicacao) {
      return res.status(404).send({
        message: `Não foi possível localizar a publicação de ID: ${publicacaoId}`
      });
    }
    Usuarios.updateOne(
      { publicacoes: objectId(publicacaoId) },
      { $pull: { publicacoes: objectId(publicacaoId) } },
      function(err, usuario) {
        if (err) res.status(500).send(err);
      }
    );
    res.status(200).send({ mensagem: "Publicação removida com sucesso!" });
  });
};

// exports.deletePublicacaoPorId = (req, res) => {
//   const publicacaoId = req.params.id;
//   Publicacoes.findByIdAndDelete({ _id: objectId(publicacaoId) }, function(
//     err,
//     publicacao
//   ) {
//     if (err) res.status(500).send(err);
//     if (!publicacao) {
//       return res.status(404).send({
//         message: `Não foi possível localizar a publicação de ID: ${publicacaoId}`
//       });
//     }

//     res.status(204).send("Publicação removida com sucesso!");
//   });
// };
