import { BaseController } from './BaseController';
import { CustomerPerService } from '../services/CustomerPerService';
import { CustomerPer, Prisma } from '@prisma/client';

export class CustomerPerController extends BaseController<CustomerPer, Prisma.CustomerPerCreateInput, Prisma.CustomerPerUpdateInput> {
  protected service = new CustomerPerService();
}
