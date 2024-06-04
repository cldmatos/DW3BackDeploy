const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionario', {
    nome: String,
    telefone: String,
    email: String,
    cpf: Number,
    cargo: String,
    salario: Number,
    desligado: Boolean
});

module.exports = Funcionario;
