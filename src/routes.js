// Aqui no import ele chama nesse formato entre cahves abaixo por que o  que está sendo chamado dentro dele
// Seria a mesma coisa de um express.Router, ou seja, ele chama essas duas propriedades que estão dentro de App lá são passadas como express
import { json, Router } from 'express';

const routes = new Router();

routes.get('/test', (req, res) => res.json({ ok: true }));

export default routes;
