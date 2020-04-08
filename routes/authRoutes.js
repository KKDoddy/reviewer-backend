import Router from 'express';
import authController from '../controllers/authController';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.signin);
router.post('/logout',tokenValidator, authController.logout);

export default router;
