import { Request, Response } from 'express';
import EmployeeModel from '../models/EmployeeModel';
import IEmployee from '../interfaces/employee';

export default class EmployeeController {
    public async index(request: Request, response: Response) {
        const employeeModel = new EmployeeModel();

        const employees = await employeeModel.getAll();
        response.json(employees);
    }

    public async create(request: Request, response: Response) {
        const {
            name,
            matricula,
            locations
        } = request.body;

        const employee = {
            name,
            matricula,
        } as IEmployee;

        const employeeModel = new EmployeeModel();

        const newEmployee = await employeeModel.create(employee, locations);

        response.json(newEmployee);
    }

    public async findById(request: Request, response: Response) {
        const { id } = request.params;

        const employeeModel = new EmployeeModel();

        const employees = await employeeModel.findByid(id);

        return response.json(employees);
    }
}