import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default async function authentication(request: Request, response: Response, next: NextFunction) {
    const header = request.headers.authorization;

    if (!header) {
        return response.status(401).json({ message: 'Token não informado' });
    }

    const token = header.split(' ')[1];

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        //console.log(decodedToken);

        return next();
    } catch (error) {
        return response.status(401).json({ message: 'Token inválido' });
    }

}