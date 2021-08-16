import { Request, Response } from 'express';
import LocationModel from '../models/LocationModel';
import ILocation from '../interfaces/location';

export default class LocationController {
    public async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const locationModel = new LocationModel();

        if (city && uf && items) {

            const parsedItems: Number[] = String(items)
                .split(',')
                .map(item => Number(item.trim()));

            const locations = await locationModel.getWithFilter(city as string, uf as string, parsedItems as number[]);
            return response.json(locations);

        } else {
            const locations = await locationModel.getAll();
            return response.json(locations);
        }
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

    public async update(request: Request, response: Response) {
        const { id } = request.params;
        const image = request.file?.filename;

        const locationModel = new LocationModel();

        const location = await locationModel.update(id as string, image as string);

        return response.json(location);
    }
}