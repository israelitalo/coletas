import knex from '../database/connection';
import userInterface from '../interfaces/user';
import { hash, compare } from 'bcryptjs';
import loginIterface from '../interfaces/login';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default class UserModel {
    public async getAll() {
        const users = await knex('users').select('id', 'name', 'email');

        return users;
    }

    public async create({ name, email, password }: userInterface) {
        const userExists = await knex('users').where({ email }).first();

        if (userExists) {
            return { message: 'Email já cadastrado' };
        }

        const passwordHash = await hash(password, 8);

        const newUser = {
            name,
            email,
            password: passwordHash
        }

        const [id] = await knex('users').insert(newUser);

        return { ...newUser, id };
    }

    public async authenticate({ email, password }: loginIterface) {
        const user = await knex('users').where({ email }).first();

        if (!user) {
            return { message: 'Falha na autenticação' };
        }

        if (!await compare(password, user.password)) {
            return { message: 'Falha na autenticação' };
        }

        const token = sign({ id: user.id, name: user.name }, authConfig.jwt.secret, {
            subject: String(user.id),
            expiresIn: authConfig.jwt.expiresIn
        });

        delete user.password;
        user.token = token;

        return { user };
    }

}