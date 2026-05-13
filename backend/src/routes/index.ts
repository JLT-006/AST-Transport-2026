import { Router } from 'express';
import authRoutes from './authRoutes';
import employeeRoutes from './employeeRoutes';
import supplierRoutes from './supplierRoutes';
import truckRoutes from './truckRoutes';
import customerOrgRoutes from './customerOrgRoutes';
import customerPerRoutes from './customerPerRoutes';
import inventoryRoutes from './inventoryRoutes';

const router = Router();

router.use('/auth', authRoutes);

// Master Data
router.use('/employees', employeeRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/trucks', truckRoutes);
router.use('/customers/org', customerOrgRoutes);
router.use('/customers/per', customerPerRoutes);
router.use('/inventory', inventoryRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
