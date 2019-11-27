const mongoose = require("mongoose");

const comentariosSchema = new mongoose.Schema(
  {
    texto: { type: String },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
    publicacaoRef: { type: mongoose.Schema.Types.ObjectId, ref: "Publicacoes" }
  },
  { versionKey: false, timestamps: true }
);

const Comentarios = mongoose.model("Comentarios", comentariosSchema);

module.exports = Comentarios;
