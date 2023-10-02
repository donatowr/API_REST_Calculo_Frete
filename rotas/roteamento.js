

const express = require('express');
const { listaProdutos, produtosPorId, calculoFrete } = require('../controladores/controlador');
const rotas = express();

rotas.get('/produtos', listaProdutos);
rotas.get('/produtos/:id', produtosPorId);
rotas.get('/produtos/:id/frete/:cep', calculoFrete )


module.exports = {rotas}