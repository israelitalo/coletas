import { Request, Response } from 'express';
import LocationModel from '../models/LocationModel';
import ILocation from '../interfaces/location';

export default class LocationController {
    public async index(request: Request, response: Response) {
        const locationModel = new LocationModel();

        const locations = await locationModel.getAll();

        response.json(locations);
    }

    public async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            image,
            items
        } = request.body;

        const location = {
            image: 'defaul.png',
            name,
            email,
            whatsapp,
            city,
            uf,
        } as ILocation;

        const locationModel = new LocationModel();

        const newLocation = await locationModel.create(location, items);

        response.json(newLocation);
    }
}