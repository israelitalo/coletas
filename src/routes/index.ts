import { Router } from "express";
import itemsRouter from "./items.routes";
import locationRouter from "./location.routes";

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/locations', locationRouter);

export default routes;