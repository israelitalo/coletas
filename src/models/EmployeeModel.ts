import knex from '../database/connection';
import IEmployee from '../interfaces/employee';

export default class EmployeeMdel {
    public async getAll() {
        const employees = await knex('employees').select();

        return employees;
    }

    public async create(employee: IEmployee, locationIds: number[]) {
        const transaction = await knex.transaction();

        const employeeExists = await
            transaction('employees')
                .select()
                .where({ matricula: employee.matricula })
                .first();

        if (employeeExists) {
            transaction.rollback();
            return { message: "Employee já cadastrado" };
        }

        const [id] = await transaction('employees').insert(employee);

        let error = 0;

        const employeeLocations = locationIds.map(async (id: any) => {
            const validateLocation = await transaction("locations")
                .where({ id })
                .first();

            if (!validateLocation) {
                error += 1;
                return;
            } else {
                return {
                    employee_id: validateLocation.id,
                    location_id: id
                }
            }
        });

        if ((await Promise.all(employeeLocations)) && error > 0) {
            transaction.rollback();
            return { message: "Alguma location enviada, não existe na base de dados" };
        }

        await transaction("employees_locations")
            .insert(await Promise.all(employeeLocations));

        await transaction.commit();

        return {
            ...employee,
            id
        };
    }

    public async findByid(id: string) {
        const employee = await
            knex('employees')
                .select()
                .where({ id })
                .first();

        if (!employee) {
            return { message: "Employee não encontrado" };
        }

        const list = await knex('employees_locations as el')
            .join('locations as l', 'el.location_id', '=', 'l.id')
            .where('el.employee_id', '=', id)
            .groupBy('el.employee_id')
            .select()

        return list;
    }
}