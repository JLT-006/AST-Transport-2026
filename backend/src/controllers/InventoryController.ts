import { Request, Response } from 'express';
import { InventoryService } from '../services/InventoryService';

export class InventoryController {
  private service = new InventoryService();

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
      const data = await this.service.findById(String(req.params.id));
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
      const data = await this.service.update(String(req.params.id), req.body);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  hardDelete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.hardDelete(String(req.params.id));
      res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}
