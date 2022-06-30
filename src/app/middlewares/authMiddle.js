import jwt from 'jsonwebtoken';
import authContent from '../../config/auth';

export default (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({ Error: 'Header authorization not exists.'})
}

const token = authHeader.split(' ');



return next();
}