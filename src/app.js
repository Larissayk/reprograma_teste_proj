const express = require("express");
const mongoose = require("mongoose");
const app = express();

//conversor
app.use(express.json());

//conexão com o MongoDB Local
mongoose.connect("mongodb://localhost:27017/proj_reprograma", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => handleError(error));

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Conexão com o MongoDB estabelecida com sucesso!");
});

// headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  next();
});

// rotas
const index = require("./routes/index");
const usuarios = require("./routes/usuariosRoute");
const publicacoes = require("./routes/publicacoesRoute");
const comentarios = require("./routes/comentariosRoute");

app.use("/", index);
app.use("/usuarios", usuarios);
app.use("/publicacoes", publicacoes);
app.use("/comentarios", comentarios);

module.exports = app;
