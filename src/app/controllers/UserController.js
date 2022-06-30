import User from '../models/User';


class UserController {

    async store(req, res) {
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
        console.log(req.userId)
        return res.json({ ok: true}) 
    }
}

export default new UserController()