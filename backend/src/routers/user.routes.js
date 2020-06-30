/**
 * Arquivo: src/routers/user.routes
 * Descrição: arquivo responsável pelas rotas de autenticação e usuários da aplicação
 * Data: 16/05/2020
 * Autor: Leticia Machado
 */

const router = require('express')();
const userController = require('../controllers/user.controller');

// => Definindo as rotas de autenticação

// => Rota de autenticação via AD
router.post('/login', userController.user_authenticate);

// => Rota responsável por validar o token
router.get('/verify/:token', userController.verify);

// => Rota responsável por listar todos os usuários
router.use(userController.allow).route('/all').get(userController.getAllUserByGroup);

module.exports = router;