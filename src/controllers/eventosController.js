const Eventos = require("../models/eventos");
const Usuarios = require("../models/usuarios");
const Comentarios = require("../models/comentarios");
const objectId = require("mongodb").ObjectID;

//GET
//Rota/eventos
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

//Rota/eventos/mes/:mes    (numero de 1 a 12)
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

//Rota/evetos/autor/:idAutor
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
//Rota/eventos/:id
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

      return res.status(201).send({ message: "Evento incluído com sucesso!", evento });
    });
  } catch (e) {
    return res.status(400).json({ error: "Erro ao criar o evento." });
  }
};

//PUT
//Rota/eventos/edit/:id
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
//Rota/eventos/delete/:id
//Evento é removida e os comentários associados a ele tb

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
    Comentarios.findOneAndDelete({ eventosRef: objectId(eventoId) })
      .then(resp =>
        res.status(200).send({ mensagem: "Evento removido com sucesso!" })
      )
      .catch(err =>
        res.status(500).json({ error: "Erro ao remover o evento." })
      );
};

