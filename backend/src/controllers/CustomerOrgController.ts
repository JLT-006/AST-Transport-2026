import { BaseController } from './BaseController';
import { CustomerOrgService } from '../services/CustomerOrgService';
import { CustomerOrg, Prisma } from '@prisma/client';

export class CustomerOrgController extends BaseController<CustomerOrg, Prisma.CustomerOrgCreateInput, Prisma.CustomerOrgUpdateInput> {
  protected service = new CustomerOrgService();
}
