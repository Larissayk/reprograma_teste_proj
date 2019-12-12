const express = require("express");
const router = express.Router();
const Publicacoes = require("../model/publicacoes");

//Rota que está renderizando minha view
router.get("/", function(req, res) {
  res.render("index.html");
});

//colocar função callback aqui !!!!
//Rota em que estou enviando as infos de Long e Lat para o meu backend
router.post("/teste", function(req, res) {
  const data = req.body;
  console.log(data)
  const latitude = data.lat;
  const longitude = data.long;

  
  res.status(200).json({
    status: "sucesso",
    latitude: data.lat,
    longitude: data.lon
  });
});

module.exports = router;
