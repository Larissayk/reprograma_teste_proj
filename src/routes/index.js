const express = require("express");
// const router = express.Router();
const app = express();

app.use(express.static('public'));


// router.get("/", function(req, res) {
//   res.status(200).send({
//     title: "Projeto Livre Reprograma API",
//     author: "Larissa Yukie Kido",
//     version: "0.0.1"
//   });
// });

// module.exports = router;
