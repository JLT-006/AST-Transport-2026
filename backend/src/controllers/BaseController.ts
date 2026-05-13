import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/BaseService';

export abstract class BaseController<T, CreateInput, UpdateInput> {
  protected abstract service: BaseService<T, CreateInput, UpdateInput>;

  private parseId(raw: unknown): string | number {
    const s = String(raw);
    return isNaN(Number(s)) ? s : Number(s);
  }

  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : undefined;
      const take = req.query.take ? Math.min(Number(req.query.take), 200) : 100;
      const data = await this.service.findAll({ skip, take });
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.findById(this.parseId(req.params.id));
      if (!data) {
        res.status(404).json({ success: false, message: 'Resource not found' });
        return;
      }
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.update(this.parseId(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  softDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.softDelete(this.parseId(req.params.id));
      res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  hardDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.service.hardDelete(this.parseId(req.params.id));
      res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
