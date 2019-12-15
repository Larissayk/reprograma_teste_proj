const mongoose = require("mongoose");

const eventosSchema = new mongoose.Schema(
  {
    titulo: { type: String },
    descricao: { type: String },
    categoria: { type: String },
    status: {
      type: String,
      enum: ["Ativo", "Concluído"],
      default: "Ativo"
    },
    prioridade: {
      type: String,
      enum: ["Alta", "Média", "Baixa"],
      default: "Média"
    },
    geolocalizacao: { type: [Number] },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentarios" }]
  },
  { versionKey: false, timestamps: true }
);

const Eventos = mongoose.model("Eventos", eventosSchema);

module.exports = Eventos;
