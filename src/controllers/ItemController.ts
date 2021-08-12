import { Request, Response } from 'express';
import ItemModel from '../models/ItemModel';
import itemInterface from '../interfaces/items';

export default class ItemController {
    public async index(request: Request, response: Response) {
        const itemModal = new ItemModel();

        const items: itemInterface[] = await itemModal.getAll();

        const parsedItems = items.map((item: itemInterface) => (
            {
                id: item.id,
                name: item.name,
                image: `http://localhost:3333/items/upload/${item.image}`
            }
        ));

        response.json(parsedItems);
    }
}