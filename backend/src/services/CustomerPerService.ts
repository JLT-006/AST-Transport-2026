import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { CustomerPer, Prisma } from '@prisma/client';

export class CustomerPerService extends BaseService<CustomerPer, Prisma.CustomerPerCreateInput, Prisma.CustomerPerUpdateInput> {
  protected model = prisma.customerPer;
  protected pkField = 'per_id';
  protected hasFlag = false;
}
