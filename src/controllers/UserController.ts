import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import userInterface from '../interfaces/user';
import loginIterface from '../interfaces/login';

export default class UserController {
    public async index(request: Request, response: Response) {
        const userModal = new UserModel();

        const users = await userModal.getAll();

        return response.json(users);
    }

    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const userRequest: userInterface = {
            name,
            email,
            password
        }

        const userModal = new UserModel();

        const user = await userModal.create(userRequest);

        return response.json(user);
    }

    public async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const loginRequest: loginIterface = { email, password };

        const userModal = new UserModel();

        const user = await userModal.authenticate(loginRequest);

        return response.json(user);
    }
}