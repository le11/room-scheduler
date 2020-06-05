/**
 * Arquivo: src/app.js
 * Descrição: arquivo responsável por toda a configuração e execução da aplicação
 * Data: 13/05/2020
 * Autor: Leticia Machado
 */

 const express = require('express');
 const cors =  require('cors');

 const app = express();

 // => Rotas
const index = require('./routers/index');
const eventRoute = require('./routers/event.routes');
const userRoute = require('./routers/user.routes');


app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors());


app.use(index);
app.use('/api/user', userRoute); //localhost:3002/api/calendar{rota}
app.use('/api/calendar', eventRoute); // localhost:3002/api/{rota}


module.exports = app;