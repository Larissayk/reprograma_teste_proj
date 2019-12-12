const mongoose = require("mongoose");

const publicacoesSchema = new mongoose.Schema(
  {
    titulo: { type: String },
    descricao: { type: String },
    categoria: { type: String },
    status: { type: String },
    prioridade: { type: String },
    coordenadas: {
      type: [Number]
     },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentarios" }]
  },
  { versionKey: false, timestamps: true }
);

const Publicacoes = mongoose.model("Publicacoes", publicacoesSchema);

module.exports = Publicacoes;
