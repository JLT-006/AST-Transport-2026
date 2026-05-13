import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const c = new EmployeeController();

router.use(authenticate);
router.get('/', c.findAll);
router.get('/:id', c.findById);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.softDelete);

export default router;
