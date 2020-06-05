/**
 * Arquivo: server.js
 * Descrição: arquivo responsável pela configuração e execução da aplicação
 * Data: 13/05/2020
 * Autor: Leticia Machado
 */
require("dotenv");

 const app = require('./src/app');
 const port = process.env.PORT || 3002;

 app.listen(port, () => {
     console.log("Sucess! Port: ",port);
 })