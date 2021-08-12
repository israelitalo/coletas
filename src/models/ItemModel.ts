import knex from '../database/connection';

export default class ItemModel {
    public async getAll() {
        const items = await knex('items').select();

        return items;
    }
}