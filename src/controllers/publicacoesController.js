const Posts = require("../model/publicacoes");

//GET

//POST
//Rota/posts
exports.post = (req, res) => {
  let publicacao = new Posts(req.body);

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