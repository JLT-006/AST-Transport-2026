import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { Supplier, Prisma } from '@prisma/client';

export class SupplierService extends BaseService<Supplier, Prisma.SupplierCreateInput, Prisma.SupplierUpdateInput> {
  protected model = prisma.supplier;
}
