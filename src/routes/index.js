const express = require("express");
const router = express.Router();

//Rota que está renderizando minha view
router.get("/", function(req, res) {
  res.render("index.html");
});

//colocar função callback aqui !!!!
//Rota em que estou enviando as infos de Long e Lat para o meu backend
router.post("/", function(req, res) {
  console
    .log(req.body)
    const data = req.body;
      res.status(200).json({
        status: "sucesso",
        latitude: data.lat,
        longitude: data.lon
      })
});

module.exports = router;
