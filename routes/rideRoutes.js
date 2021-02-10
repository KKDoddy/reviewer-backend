import Router from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import { isCommuter, isDriver } from '../middlewares/roleVerifier';
import { isIdSafeInteger } from '../middlewares/sanitizer';
import { isDriverRideOwner } from '../middlewares/checkOwnership';
import { validateRideStartInfo, validateRideEndInfo, validateForm } from '../middlewares/formValidations';
import { saveRideRequest, approveRideRequest, denyRideRequest, saveRideStart, saveRideEnd } from '../controllers/rideController';
import { validateRideAction } from '../middlewares/rideActionValidations';

const router = Router();

router.post('/new', tokenValidator, isCommuter, validateForm, saveRideRequest);

router.put('/:id/approve', tokenValidator, isDriver, isIdSafeInteger, isDriverRideOwner, validateRideAction, approveRideRequest);

router.put('/:id/deny', tokenValidator, isDriver, isIdSafeInteger, isDriverRideOwner, validateRideAction, denyRideRequest);

router.put('/:id/start', tokenValidator, isDriver, isIdSafeInteger, isDriverRideOwner, validateRideStartInfo, validateRideAction, validateForm, saveRideStart);

router.put('/:id/end', tokenValidator, isDriver, isIdSafeInteger, isDriverRideOwner, validateRideEndInfo, validateRideAction, validateForm, saveRideEnd);

export default router;
