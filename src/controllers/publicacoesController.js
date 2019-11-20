const Publicacoes = require("../model/publicacoes");

//GET
//Rota/publicacoes
exports.get = (req, res) => {
  Publicacoes.find(function(err, publicacoes) {
    if (err) res.status(500).send(err);
    res.status(200).send(publicacoes);
  });
};

//Rota/publicações/:categoria
exports.getByCategoria = (req, res) => {
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

//Rota/publicações/timeStamp
exports.getTimeStampPorId = (req, res) => {
  const publicacaoId = req.params.id;
  Publicacoes.findById({ _id: publicacaoId }, function(err, publicacao) {
    if (err) res.status(500).send(err);
    // console.log(publicacao);
    const timeStamp = publicacao.map(({ _id}) => ({ _id}));
    console.log(timeStamp);
  });
};

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

//DELETE
