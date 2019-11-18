const Usuarios = require("../model/usuarios");

//GET

//Rota/usuarios
exports.get = (req, res) => {
  Usuarios.find(function(err, usuarios) {
    if (err) res.status(500).send(err);
    res.status(200).send(usuarios);
  });
};

//Rota/usuarios por Id
exports.getUsuariosPorId = (req, res) => {
  const usuarioId = req.params.id;
  //   console.log(usuarioId);
  Usuarios.find({ _id: usuarioId }, function(err, usuario) {
    if (err) return res.status(500).send(err);
    // console.log(usuario);
    res.status(200).send(usuario);
  });
};

//POST

//Rota/usuarios
exports.post = (req, res) => {
  let usuario = new Usuarios(req.body);

  usuario.save(function(err) {
    if (err) res.status(500).send(err);

    res.status(201).send({
      status: "ativo",
      mensagem: `Usuário(a) ${usuario.nome} incluído(a) com sucesso!`
    });
  });
};

//PUT

//DELETE
