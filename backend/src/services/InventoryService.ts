import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { Inventory, Prisma } from '@prisma/client';

export class InventoryService extends BaseService<Inventory, Prisma.InventoryCreateInput, Prisma.InventoryUpdateInput> {
  protected model = prisma.inventory;
  protected pkField = 'inv_id';
  protected hasFlag = false;
}
