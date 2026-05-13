import { Router } from 'express';
import { TruckController } from '../controllers/TruckController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const c = new TruckController();

router.use(authenticate);
router.get('/', c.findAll);
router.get('/:id', c.findById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.softDelete);

export default router;
