/**
 * Arquivo: src/routers/event.routes
 * Descrição: arquivo responsável pelas rotas de evento da aplicação
 * Data: 20/05/2020
 * Autor: Leticia Machado
 */

const router = require("express")();
const eventController = require("../controllers/event.controller");
const userController = require("../controllers/user.controller");


// => Rotas do CRUD

// => Rota responsável por listar todos os eventos (fullcalendar mode): (GET) localhost:3002/api/events
router.use(userController.allow).route("/events").get(eventController.getAllEvents);

// => Rota responsável por listar todos os eventos (all information) (GET) localhost:3002/api/events/all
router.use(userController.allow).route("/events/all").get(eventController.listAll);

// => Rota responsável por mostrar um Evento através de seu id (GET) localhost:3002/api/events/:id
router.use(userController.allow).route("/event/:id").get(eventController.findById);

// => Rota responsável por mostrar todos os Eventos de determinado usuário (GET) localhost:3002/api/events/:user
router.use(userController.allow).route("/events/:user").get(eventController.findByUser);

// => Rota responsável por mostrar todos os Eventos de determinada SALA (GET) localhost:3002/api/events/:roomId
router.use(userController.allow).route("/room/:id").get(eventController.getAllByRoom);

// => Rota responsável por criar um novo Evento: (POST) localhost:3002/api/event
router.use(userController.allow).route("/event").post(eventController.createEvent);

// => Rota responsável por apagar um Evento por id (DELETE) localhost:3002/api/events/:id
router.use(userController.allow).route("/events/:id").delete(eventController.deleteById);

module.exports = router;
