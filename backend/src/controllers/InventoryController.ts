import { BaseController } from './BaseController';
import { InventoryService } from '../services/InventoryService';
import { Inventory, Prisma } from '@prisma/client';

export class InventoryController extends BaseController<Inventory, Prisma.InventoryCreateInput, Prisma.InventoryUpdateInput> {
  protected service = new InventoryService();
}
