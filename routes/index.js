import Router from 'express';
import authRoutes from './authRoutes';
import cooperativeRoutes from './cooperativeRoutes';
import userRoutes from './userRoutes';
import motorVehicleRoutes from './motorVehicleRoutes';
import rideRoutes from './rideRoutes';
import reviewRoutes from './reviewRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cooperatives', cooperativeRoutes);
router.use('/users', userRoutes);
router.use('/motorVehicles', motorVehicleRoutes);
router.use('/rides', rideRoutes);
router.use('/reviews', reviewRoutes);

export default router;
