// Aqui no import ele chama nesse formato entre cahves abaixo por que o  que está sendo chamado dentro dele
// Seria a mesma coisa de um express.Router, ou seja, ele chama essas duas propriedades que estão dentro de App lá são passadas como express
import { json, Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/test', async (req, res) => {
    const user = await User.create({
        name: 'Arthur',
        email: 'arthur@gmail.com',
        password_hash: '1234',
    });
   return res.json(user);
});

export default routes;
