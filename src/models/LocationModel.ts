import knex from '../database/connection';
import IItems from '../interfaces/items';
import ILocation from '../interfaces/location';

export default class LocationModel {
    public async getAll() {
        const locations = await knex('locations').select();

        return locations;
    }

    public async getWithFilter(city: string, uf: string, parsedItems: number[]) {
        const list = await knex('locations')
            .join('locations_items', 'locations.id', '=', 'locations_items.location_id')
            .whereIn('locations_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('locations.*');

        return list;
    }

    public async create(location: ILocation, items: IItems[]) {
        const transaction = await knex.transaction();

        const locationExists = await
            transaction('locations')
                .select()
                .where({ name: location.name })
                .first();

        if (locationExists) {
            transaction.rollback();
            return { message: "Location já cadastrada" };
        }

        const [id] = await transaction('locations').insert(location);

        let error = 0;

        const locationItens = items.map(async (item_id: any) => {
            const validateItem = await transaction("items")
                .where({ id: item_id })
                .first();

            if (!validateItem) {
                error += 1;
                return;
            } else {
                return {
                    item_id: validateItem.id,
                    location_id: id
                }
            }
        });

        if ((await Promise.all(locationItens)) && error > 0) {
            transaction.rollback();
            return { message: "Algum item enviado, não existe na base de dados" };
        }

        await transaction("locations_items")
            .insert(await Promise.all(locationItens));

        await transaction.commit();

        return {
            ...location,
            id
        };
    }

    public async update(id: string, image: string) {
        let location = await knex('locations').where({ id }).first();

        if (!location) {
            return { message: 'Location não cadastrada' };
        }

        await knex('locations')
            .update({ ...location, image })
            .where({ id });

        location.image = image;

        return location;
    }
}