import { Router } from "express";
import itemsRouter from "./items.routes";
import locationRouter from "./location.routes";
import employeeRouter from "./employee.routes";
import usersRouter from "./users.router";

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/locations', locationRouter);
routes.use('/employees', employeeRouter);
routes.use('/users', usersRouter);

export default routes;