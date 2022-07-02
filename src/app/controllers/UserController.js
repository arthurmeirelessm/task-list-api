import User from '../models/User';
import bcript from 'bcrypt';
import * as Yup from 'yup';


class UserController {

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ Error: 'Invalid request' });
        }

        const userIsSame = await User.findOne({
            where: { email: req.body.email }
        });

        if (userIsSame) {
            return res.status(401).json({ Error: 'This user already exists' });
        }

        const { id, name, email } = await User.create(req.body);
        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldpassword: Yup.string().required().min(6),
            password: Yup.string().min(6).when('oldpassword', (oldpassword, field) => {
                oldpassword ? field.required() : field
            }),
            confirmpassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
        }),
        });

        if(!(schema.isValid(req.body))) {
            return res.status(400).json({Error: 'Invalid request' })
        }

        const { email, oldpassword } = req.body;
        const user = await User.findByPk(req.userId);

        if (email != user.email) {
            const emailExists = await User.findOne({ where: { email }, });
            if (emailExists) {
                return res.status(400).json({ Error: 'Email already exists' })
            }
        }

        if (oldpassword && !(await user.checkPassword(oldpassword))) {
            return res.status(401).json({ Error: 'Invalid password' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
        })
    }
}

export default new UserController()