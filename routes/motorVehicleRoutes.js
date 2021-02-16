import Router from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import { isManager } from '../middlewares/roleVerifier';
import { motorVehicleInfoValidator, validateForm } from '../middlewares/formValidations';
import { isIdSafeInteger } from '../middlewares/sanitizer';
import { createMotorVehicle, viewSingleMotorVehicle, viewAllMotorVehicles, searchMotorVehicles } from '../controllers/motorVehicleController';

const router = Router();

router.post('/new', tokenValidator, isManager, motorVehicleInfoValidator, validateForm, createMotorVehicle);

router.get('/:id', tokenValidator, isManager, isIdSafeInteger, viewSingleMotorVehicle);

router.get('/', tokenValidator, isManager, viewAllMotorVehicles);

router.get('/search/:key', tokenValidator, isManager, searchMotorVehicles);

export default router;
