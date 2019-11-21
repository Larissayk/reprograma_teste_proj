const Publicacoes = require("../model/publicacoes");
const objectId = require("mongodb").ObjectID;

//GET
//Rota/publicacoes
exports.get = (req, res) => {
  Publicacoes.find(function(err, publicacoes) {
    if (err) res.status(500).send(err);
    res.status(200).send(publicacoes);
  });
};

//Rota/publicacoes/:id
exports.getPublicacaoPorId = (req, res) => {
  const publicacaoId = req.params.id;
  Publicacoes.find({ _id: objectId(publicacaoId) }, function(err, publicacao) {
    if (err) res.status(500).send(err);
    if (!publicacao) {
      return res.status(404).send({
        message: `Não foi possível localizar a publicação de ID: ${publicacaoId}`
      });
    }

    res.status(200).send(publicacao);
  });
};

//Rota/publicações/:categoria
exports.getPorCategoria = (req, res) => {
  const categoriaPublicacao = req.params.categoria;
  console.log(categoriaPublicacao);
  Publicacoes.find({ categoria: categoriaPublicacao }, function(
    err,
    publicacao
  ) {
    if (err) res.status(500).send(err);
    res.status(200).send(publicacao);
  });
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

//Rota/publicações/timeStamp/:id
// exports.getTimeStampPorId = (req, res) => {
//   const publicacaoId = req.params.id;
//   // Acha o registro referente ao ID
//   Publicacoes.findById(publicacaoId, function(err, publicacao) {
//     if (err) res.status(500).send(err);
//     // pega timeStamp do ID
//     const timestamp = publicacaoId.toString().substring(0, 8);
//     const date = new Date(parseInt(timestamp, 16) * 1000);
//     res.status(200).send(`${publicacao}, timeStamp: ${date}`);
//   });
// };

//POST
//Rota/publicacoes
exports.post = (req, res) => {
  let publicacao = new Publicacoes(req.body);

  publicacao.save(function(err) {
    if (err) res.status(500).send(err);

    res.status(201).send({
      status: "ativo",
      mensagem: "Post incluído com sucesso!"
    });
  });
};

//PUT
//Rota/publicacoes/edit/:id
exports.putPublicacaoPorId = (req, res) => {
  // const editPublicacao = {
  //   titulo: req.body.titulo,
  //   descricao: req.body.descricao,
  //   categoria: req.body.categoria,
  //   valor: req.body.valor
  // };
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
        status: "ativo",
        mensagem: `Publicação atualizada com sucesso!`
      });
    }
  );
};

//DELETE
//Rota/publicacoes/delete/:id
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

    res.status(204).send("Publicação removida com sucesso!");
  });
};
