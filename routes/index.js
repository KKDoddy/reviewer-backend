import Router from 'express';
import authRoutes from './authRoutes';
import cooperativeRoutes from './cooperativeRoutes';
import userRoutes from './userRoutes';
import motorVehicleRoutes from './motorVehicleRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cooperatives', cooperativeRoutes);
router.use('/users', userRoutes);
router.use('/motorVehicles', motorVehicleRoutes);

export default router;
