import { BaseController } from './BaseController';
import { EmployeeService } from '../services/EmployeeService';
import { Employee, Prisma } from '@prisma/client';

export class EmployeeController extends BaseController<Employee, Prisma.EmployeeCreateInput, Prisma.EmployeeUpdateInput> {
  protected service = new EmployeeService();
}
