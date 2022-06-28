// Aqui no import ele chama nesse formato entre cahves abaixo por que o  que está sendo chamado dentro dele
// Seria a mesma coisa de um express.Router, ou seja, ele chama essas duas propriedades que estão dentro de App lá são passadas como express
import { json, Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

//USERS
routes.post('/users', UserController.store);

//SESSIONS
routes.post('/sessions', SessionController.store);

export default routes;
