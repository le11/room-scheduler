/**
 * Arquivo: src/index.js
 * Descrição: arquivo responsável pela chamada da API da aplicação
 * Data: 13/05/2020
 * Autor: Leticia Machado
 */

 const express = require('express');
 const router = express.Router();

 router.get('/api',(req,res) => {
     res.status(200).send({
         success: 'true',
         message: 'Welcome to the node.js calendar API',
         version: '1.0.0'
     })
 });

 module.exports = router;