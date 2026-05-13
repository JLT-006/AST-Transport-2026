import { BaseService } from './BaseService';
import prisma from '../config/prisma';
import { Truck, Prisma } from '@prisma/client';

export class TruckService extends BaseService<Truck, Prisma.TruckCreateInput, Prisma.TruckUpdateInput> {
  protected model = prisma.truck;
}
