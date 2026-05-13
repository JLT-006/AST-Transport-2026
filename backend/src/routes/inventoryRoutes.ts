import { Router } from 'express';
import { InventoryController } from '../controllers/InventoryController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const c = new InventoryController();

router.use(authenticate);
router.get('/', c.findAll);
router.get('/:id', c.findById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.hardDelete);

export default router;
