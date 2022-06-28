import jwt from 'jsonwebtoken';
import User from '../models/User';


class SessionController {

    async store(req, res) {
        const { email, password } = req.body;
        const userExists = await User.findOne({ where: { email } });

        if (!userExists) {
            return res.status(401).json({ Error: 'User not exists' });
        }

        //Vericar se a senha bate ou não (senha já criptografada)
        if (!(await userExists.checkPassword(password))) {
            return res.status(401).json({ Error: 'Incorret password' });
        }

        const { id, name } = userExists;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, 'fee974562a0f0dfec676c76eaf1587f9', { expiresIn: '7d' }),
        });

    }
}

export default new SessionController();