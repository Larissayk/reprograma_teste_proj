const mongoose = require("mongoose")


const publicacoesSchema = new mongoose.Schema(
  {
    titulo: { type: String },
    descricao: { type: String },
    categoria: { type: String },
    valor: { type: Number },
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'}
  },
  { versionKey: false, timestamps: true }
);

const Publicacoes = mongoose.model("Publicacoes", publicacoesSchema);

module.exports = Publicacoes;
