import { Request, Response } from 'express';
import { BaseService } from '../services/BaseService';

export abstract class BaseController<T, CreateInput, UpdateInput> {
  protected abstract service: BaseService<T, CreateInput, UpdateInput>;

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.service.findAll();
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      // Depending on schema, ID might be int or string.
      const parsedId = isNaN(Number(id)) ? id : Number(id);
      const data = await this.service.findById(parsedId);
      
      if (!data) {
        res.status(404).json({ success: false, message: 'Resource not found' });
        return;
      }
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const parsedId = isNaN(Number(id)) ? id : Number(id);
      const data = await this.service.update(parsedId, req.body);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  softDelete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const parsedId = isNaN(Number(id)) ? id : Number(id);
      await this.service.softDelete(parsedId);
      res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
