import { Router } from "express";
import itemsRouter from "./items.routes";
import locationRouter from "./location.routes";
import employeeRouter from "./employee.routes";

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/locations', locationRouter);
routes.use('/employees', employeeRouter);

export default routes;