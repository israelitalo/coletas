import Knex from "knex";

export async function seed(knex: Knex) {
    await knex('items').insert([
        { name: 'Papéis', image: 'papel.png' },
        { name: 'Vidros', image: 'vidro.png' },
        { name: 'Óleo de cozinha', image: 'oleo.png' },
        { name: 'Baterias', image: 'bateria.png' },
        { name: 'Eletrônicos', image: 'eletronico.png' },
        { name: 'Orgânicos', image: 'organico.png' },
    ]);
}