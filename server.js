const app = require("./src/app");
const port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`O app está rodando na porta ${port}`);
});
 
app.get("/ping", (req, res) => {
  res.send("pong");
})