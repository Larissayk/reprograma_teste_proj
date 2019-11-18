const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema(
    {
        nome: {type: String},
        email: {type: String},
        saldo: {type:Number}
    },
    {   versionKey: false}
);

const Usuarios = mongoose.model("Usuarios", usuariosSchema);

module.exports = Usuarios;