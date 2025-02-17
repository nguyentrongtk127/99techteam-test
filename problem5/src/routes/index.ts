import { Router } from 'express';
import userRoutes from './user.route';

const router = Router();

// Combine all routes
router.use('/users', userRoutes);

export default router;