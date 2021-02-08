import Router from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import { isOperator } from '../middlewares/roleVerifier';
import { isIdSafeInteger } from '../middlewares/sanitizer';
import { viewSingleManager, viewAllManagers, searchManagers, viewSingleDriver, viewAllDrivers, searchDrivers } from '../controllers/userController';

const router = Router();

router.get('/managers/:id', tokenValidator, isOperator, isIdSafeInteger, viewSingleManager);

router.get('/managers', tokenValidator, isOperator, viewAllManagers);

router.get('/managers/search/:key', tokenValidator, isOperator, searchManagers);

router.get('/drivers/:id', tokenValidator, isIdSafeInteger, viewSingleDriver);

router.get('/drivers', tokenValidator, viewAllDrivers);

router.get('/drivers/search/:key', tokenValidator, searchDrivers);

export default router;
