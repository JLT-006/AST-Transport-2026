import { BaseController } from './BaseController';
import { SupplierService } from '../services/SupplierService';
import { Supplier, Prisma } from '@prisma/client';

export class SupplierController extends BaseController<Supplier, Prisma.SupplierCreateInput, Prisma.SupplierUpdateInput> {
  protected service = new SupplierService();
}
