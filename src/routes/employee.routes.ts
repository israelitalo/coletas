import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController";

const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.get('/', employeeController.index);
employeeRouter.post('/', employeeController.create);
employeeRouter.get('/:id', employeeController.findById);

export default employeeRouter;