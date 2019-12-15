const express = require("express");
const router = express.Router();

//Rota que está renderizando minha view
router.get("/", function(req, res) {
  res.render("index.html");
});



module.exports = router;
