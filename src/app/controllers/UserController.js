import User from '../models/User';

class UserController {

    async store(req, res) {
        
        const emailExists = req.body.email
        const userIsSame = await User.findOne({
            where: { email: emailExists }
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
}

export default new UserController()