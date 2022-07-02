// Aqui no import ele chama nesse formato entre cahves abaixo por que o  que está sendo chamado dentro dele
// Seria a mesma coisa de um express.Router, ou seja, ele chama essas duas propriedades que estão dentro de App lá são passadas como express
import { json, Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/authMiddle';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

//USERS
routes.post('/users', UserController.store);

routes.put('/users', authMiddleware, UserController.update);

//SESSIONS
routes.post('/sessions', SessionController.store);

//TASKS
routes.post('/tasks', authMiddleware, TaskController.store);
routes.get('/tasks', TaskController.index)

export default routes;
