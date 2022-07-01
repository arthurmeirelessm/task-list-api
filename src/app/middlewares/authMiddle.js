import jwt from 'jsonwebtoken';
import authContent from '../../config/auth';
import { promisify } from 'util';


export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ Error: 'Header authorization not exists.' })
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authContent.secret);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(402).json({ Error: 'Invalid token' });
    }
}