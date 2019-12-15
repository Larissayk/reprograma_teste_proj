const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//static middleware para minha view
app.use(express.static(__dirname + "/views"));

//Rota da API-doc
app.use(express.static('doc'))
app.get('/api-doc',(req, res) => {
  res.sendFile(path.join( __dirname + './../doc/index.html'));
})

//conversor
app.use(express.json());

//conexão com o MongoDB Local
// mongoose.connect("mongodb://localhost:27017/proj_reprograma", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).catch(error => handleError(error));



//conexão com MongoDB Atlas
try {
  mongoose.connect(
    "mongodb+srv://Admin:admin3214@cluster0-nym3u.mongodb.net/proj_reprograma",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
} catch (error) {
  handleError(error);
}

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
const usuarios = require("./routes/usuariosRoutes");
const eventos = require("./routes/eventosRoutes");
const comentarios = require("./routes/comentariosRoutes");
const sessions = require("./routes/sessionRoutes");

app.use("/", index);
app.use("/usuarios", usuarios);
app.use("/eventos", eventos);
app.use("/comentarios", comentarios);
app.use("/sessions", sessions);


module.exports = app;
