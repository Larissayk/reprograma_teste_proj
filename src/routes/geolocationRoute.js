const express = require("express");
const router = express.Router();

router.use(express.static('view'));

router.get("/", (req, res) => {
    res.sendFile(__dirname + '../view/index.html')
});

router.post("/", (req, res) => {
    console.log(req.body); 
})

module.exports = router;

