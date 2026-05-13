import { BaseController } from './BaseController';
import { TruckService } from '../services/TruckService';
import { Truck, Prisma } from '@prisma/client';

export class TruckController extends BaseController<Truck, Prisma.TruckCreateInput, Prisma.TruckUpdateInput> {
  protected service = new TruckService();
}
