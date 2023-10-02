
//import express e rotas
const express = require('express');
const { rotas } = require('../rotas/roteamento');

//instancia do express
const server = express();

//uso das rotas importadas
server.use(rotas)

server.listen(3000)