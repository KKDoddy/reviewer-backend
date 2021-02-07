import Router from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import { isOperator } from '../middlewares/roleVerifier';
import { isIdSafeInteger } from '../middlewares/sanitizer';
import { viewSingleManager, viewAllManagers, searchManagers } from '../controllers/userController';

const router = Router();

router.get('/managers/:id', tokenValidator, isOperator, isIdSafeInteger, viewSingleManager);

router.get('/managers', tokenValidator, isOperator, viewAllManagers);

router.get('/managers/search/:key', tokenValidator, isOperator, searchManagers);

export default router;
