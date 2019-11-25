const express = require('express');
const PessoasController = require('./controllers/PessoasController');
const ContasController = require('./controllers/ContasController');

const routes = express.Router();

//Usuários
routes.post('/login', PessoasController.find);
routes.post('/register', PessoasController.create);


//Contas
routes.get('/contas', ContasController.list);
routes.post('/contas', ContasController.create);
routes.put('/contas', ContasController.update);
routes.delete('/contas', ContasController.delete);

module.exports = routes;