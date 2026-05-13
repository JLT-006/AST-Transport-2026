import prisma from '../config/prisma';
import { CustomerPer, Prisma } from '@prisma/client';

// tbl_customer_per has no `flag` column — cannot extend BaseService directly
export class CustomerPerService {
  async findAll(): Promise<CustomerPer[]> {
    return prisma.customerPer.findMany();
  }

  async findById(id: string): Promise<CustomerPer | null> {
    return prisma.customerPer.findUnique({ where: { per_id: id } });
  }

  async create(data: Prisma.CustomerPerCreateInput): Promise<CustomerPer> {
    return prisma.customerPer.create({ data });
  }

  async update(id: string, data: Prisma.CustomerPerUpdateInput): Promise<CustomerPer> {
    return prisma.customerPer.update({ where: { per_id: id }, data });
  }

  async hardDelete(id: string): Promise<CustomerPer> {
    return prisma.customerPer.delete({ where: { per_id: id } });
  }
}
