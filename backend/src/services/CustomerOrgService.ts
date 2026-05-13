import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { CustomerOrg, Prisma } from '@prisma/client';

export class CustomerOrgService extends BaseService<CustomerOrg, Prisma.CustomerOrgCreateInput, Prisma.CustomerOrgUpdateInput> {
  protected model = prisma.customerOrg;
}
