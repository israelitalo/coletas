import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();

const userController = new UserController();

usersRouter.get('/', userController.index);
usersRouter.post('/', userController.create);
usersRouter.post('/login', userController.login);

export default usersRouter;