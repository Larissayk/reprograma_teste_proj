const mongoose = require("mongoose");

const publicacoesSchema = new mongoose.Schema(
  {
    titulo: { type: String }, 
    descricao: { type: String },
    categoria: {type:String},
    valor: { type: Number }
  },
  { versionKey: false }
);

const Publicacoes = mongoose.model("Publicacoes", publicacoesSchema);

module.exports = Publicacoes;
