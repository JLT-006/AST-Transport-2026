import prisma from '../config/prisma';
import { Inventory, Prisma } from '@prisma/client';

// tbl_inventory has no `flag` column — cannot extend BaseService directly
export class InventoryService {
  async findAll(): Promise<Inventory[]> {
    return prisma.inventory.findMany();
  }

  async findById(id: string): Promise<Inventory | null> {
    return prisma.inventory.findUnique({ where: { inv_id: id } });
  }

  async create(data: Prisma.InventoryCreateInput): Promise<Inventory> {
    return prisma.inventory.create({ data });
  }

  async update(id: string, data: Prisma.InventoryUpdateInput): Promise<Inventory> {
    return prisma.inventory.update({ where: { inv_id: id }, data });
  }

  async hardDelete(id: string): Promise<Inventory> {
    return prisma.inventory.delete({ where: { inv_id: id } });
  }
}
