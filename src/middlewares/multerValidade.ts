import { Request, Response, NextFunction } from 'express';
import LocationModel from '../models/LocationModel';

export default async function multerValidade(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    if (!id) {
        return response.status(400).json({ message: 'Location não informada' });
    }

    const locationModel = new LocationModel();

    const location = await locationModel.findOneById(id as string);

    if (!location) {
        return response.status(400).json({ message: 'Location não cadastrada' });
    }

    return next();
}