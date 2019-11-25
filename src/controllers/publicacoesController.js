const Publicacoes = require("../model/publicacoes");
const Usuarios = require("../model/usuarios");
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

//Rota/publicações/autor/:autor
exports.getPublicacaoPorIdAutor = (req, res) => {
  const usuarioId = req.params.idAutor;
  Publicacoes.find({ autor: objectId(usuarioId) }, function(err, publicacao) {
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
exports.postPorUsuario = async (req, res) => {
  const usuario = req.params;
  const id = usuario.id;
  const { titulo, descricao, categoria, valor } = req.body;
  const publicacao = await Publicacoes.create({
    titulo,
    descricao,
    categoria,
    valor,
    autor: id
  });
  await publicacao.save();

  const userById = await Usuarios.findById(id);

  userById.publicacoes.push(publicacao);
  await userById.save(function(err) {
    if (err) res.status(500).send(err);

    return res.status(201).send("Post incluído com sucesso!", userById);
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
//PS: I still need to make the reference of the post inside the author object be deleted as well
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
