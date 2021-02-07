import Router from 'express';
import authRoutes from './authRoutes';
import cooperativeRoutes from './cooperativeRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cooperatives', cooperativeRoutes);
router.use('/users', userRoutes);

export default router;
