import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { Employee, Prisma } from '@prisma/client';

export class EmployeeService extends BaseService<Employee, Prisma.EmployeeCreateInput, Prisma.EmployeeUpdateInput> {
  protected model = prisma.employee;
}
