const express = require('express');
//meu servidor vai rodar express
const server = express();
const mongoose = require('mongoose');

const funcionarioRoutes = require('./routes/funcionarioRoutes');

server.use(express.json()); 

//Criando o endpoint e rotas
server.use('/funcionario', funcionarioRoutes);

//Conexão com Mongo DB Atlas
const DB_USER = `userMongo`;
const DB_PASSWORD = `Mong0Db`;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.84dzq25.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

    server.use(express.json());

// server.listen = roda o servidor - (3000) porta
server.listen(3000);