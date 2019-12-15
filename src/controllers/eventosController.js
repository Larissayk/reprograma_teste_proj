const Eventos = require("../model/eventos");
const Usuarios = require("../model/usuarios");
const objectId = require("mongodb").ObjectID;

//GET
//Rota/publicacoes
//Busca eventos e filtra por categoria, status e prioridade.
exports.getEventos = (req, res) => {
  Eventos.find(req.query)
    .sort({ createdAt: -1 })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foram encontrados resultados para essa busca.`
        });
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Não foi possível trazer o registro de eventos." })
    );
};

//Rota/publicacoes/:id
exports.getEventoPorId = (req, res) => {
  const eventoId = req.params.id;
  Eventos.find({ _id: objectId(eventoId) })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar o evento de ID: ${eventoId}`
        });
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res.status(400).json({ error: "Não foi possível localizar o evento." })
    );
};

//Rota/publicações/:categoria
//from the newest to the oldest
// exports.getPorCategoria = (req, res) => {
//   const categoriaPublicacao = req.params.categoria;
//   console.log(categoriaPublicacao);
//   Publicacoes.find({ categoria: categoriaPublicacao })
//     .sort({ createdAt: -1 })
//     .then(resp => {
//       if (resp == 0) {
//         return res.status(404).send({
//           message: `Não foi possível localizar publicações para a categoria ${categoriaPublicacao}.`
//         });
//       }
//       res.status(200).send(resp);
//     })
//     .catch(err => res.status(500).json({ error: erro }));
// };

//Rota/publicações/status/:status
//from the newest to the oldest
// exports.getPorStatus = (req, res) => {
//   const statusPublicacao = req.params.status;
//   Publicacoes.find({ status: statusPublicacao })
//     .sort({ createdAt: -1 })
//     .then(resp => {
//       if (resp == 0) {
//         return res.status(404).send({
//           message: `Não foi possível localizar publicações com status ${statusPublicacao}.`
//         });
//       }
//       res.status(200).send(resp);
//     })
//     .catch(err => res.status(500).json({ error: erro }));
// };

//Rota/publicações/prioridade/:prioridade
//from the newest to the oldest
// exports.getPorPrioridade = (req, res) => {
//   const prioridadePublicacao = req.params.prioridade;
//   Publicacoes.find({ prioridade: prioridadePublicacao })
//     .sort({ createdAt: -1 })
//     .then(resp => {
//       if (resp == 0) {
//         return res.status(404).send({
//           message: `Não foi possível localizar publicações de prioridade ${prioridadePublicacao}.`
//         });
//       }
//       res.status(200).send(resp);
//     })
//     .catch(err => res.status(500).json({ error: erro }));
// };

//Rota/publicacoes/mesCriacao/:mes    (numero de 1 a 12)
// exports.getPublicacaoPorMes = (req, res) => {
//   const mesInicio = parseInt(req.params.mesInicial);
//   console.log(mesInicio)
//   const mesFim = parseInt(req.params.mesFinal);
//   // console.log(mesPublicacao);
//   Publicacoes.find({
//     $expr:{ $and: {
//       // $eq: [{ $dayOfMonth: "$createdAt" }, mesInicio],
//       // $eq: [{ $dayOfMonth: "$createdAt" }, mesFim],
//       $gte: [{ $dayOfMonth: "$createdAt" }, mesInicio],
//       $lt: [{ $dayOfMonth: "$createdAt" }, mesFim]
//     }}
//   })
//     .then(resp => {
//       if (resp == 0) {
//         return res.status(404).send({
//           message: `Não foi possível localizar publicações para esse intervalo.`
//         });
//       }
//       res.status(200).send(resp);
//     })
//     .catch(err => res.status(500).json({ error: "erro" }));
// };

exports.getEventoPorMes = (req, res) => {
  const mesEvento = parseInt(req.params.mes);
  console.log(mesEvento);
  Eventos.find({
    $expr: {
      $eq: [{ $month: "$createdAt" }, mesEvento]
    }
  })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar eventos para o mês ${mesEvento}.`
        });
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Não foi possível localizar eventos para esse mês." })
    );
};

//Rota/publicacoes/diaCriacao/:dia
exports.getEventoPorDia = (req, res) => {
  const diaEvento = parseInt(req.params.dia);
  console.log(diaEvento);
  Eventos.find({
    $expr: {
      $eq: [{ $dayOfMonth: "$createdAt" }, diaEvento]
    }
  })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar eventos para o dia ${diaEvento}.`
        });
      }
      res.status(200).send(resp);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Não foi possível localizar eventos para esse dia." })
    );
};

//Rota/publicações/autor/:idAutor
//Busca por autor do evento e filtra por categoria, status e prioridade.
//from the newest to the oldest
exports.getEventosPorIdAutor = async (req, res) => {
  const usuarioId = req.params.idAuthor;

  const eventoPorUsuario = Eventos.find({ autor: objectId(usuarioId) }).sort({
    createdAt: -1
  });
  if (!eventoPorUsuario) {
    return res.status(404).send({
      message: `Não foi possível localizar eventos para esse usuário.`
    });
  }

  try {
    const busca = await eventoPorUsuario
      .find(req.query)
      .sort({ createdAt: -1 });
    if (!busca) {
      return res.status(404).send({
        message: `Não foram encontrados resultados para essa busca.`
      });
    }
    return res.status(200).send(busca);
  } catch (e) {
    return res.status(400).json({ error: "Erro na busca." });
  }
};

//POST
//Rota/publicacoes/:id
//add Post per UserId
exports.postEventoPorUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const {
    titulo,
    descricao,
    categoria,
    status,
    prioridade,
    geolocalizacao
  } = req.body;
  console.log(req.body);
  const evento = await Eventos.create({
    titulo,
    descricao,
    categoria,
    status,
    prioridade,
    geolocalizacao,
    autor: usuarioId
  });

  console.log(evento);

  await evento.save(function(err) {
    if (err) res.status(500).send(err);

    return console.log("Evento salvo");
  });

  try {
    const usuarioPorId = await Usuarios.findById(usuarioId);

    usuarioPorId.eventos.push(evento);
    await usuarioPorId.save(function(err) {
      if (err) res.status(500).send(err);

      return res.status(201).send({ message: "Evento incluído com sucesso!" });
    });
  } catch (e) {
    return res.status(400).json({ error: "erro" });
  }
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
exports.putEventoPorId = (req, res) => {
  const eventoId = req.params.id;

  Eventos.findByIdAndUpdate({ _id: objectId(eventoId) }, { $set: req.body })
    .then(resp => {
      if (resp == 0) {
        return res.status(404).send({
          message: `Não foi possível localizar o evento de ID ${eventoId}.`
        });
      }
      res.status(200).send({ message: "Evento atualizado com sucesso" });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Erro ao atualizar as informações do evento." })
    );
};

//DELETE
//Rota/publicacoes/delete/:id
//Publicação é removida; deleta a referência da publicação no Usuário.
//Mas os comentários da publicação apagada permanecem.

exports.deleteEventoPorId = (req, res) => {
  const eventoId = req.params.id;
  Eventos.findByIdAndDelete({ _id: objectId(eventoId) }).then(resp => {
    if (resp == 0) {
      return res
        .status(404)
        .send({
          message: `Não foi possível localizar o evento de ID: ${eventoId}`
        })
        .catch(err =>
          res.status(500).json({ error: "erro ao deletar o evento" })
        );
    }
  }),
    Usuarios.updateOne(
      { eventos: objectId(eventoId) },
      { $pull: { eventos: objectId(eventoId) } }
    )
      .then(resp =>
        res.status(200).send({ mensagem: "Evento removido com sucesso!" })
      )
      .catch(err => res.status(500).json({ error: "erro" }));
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
