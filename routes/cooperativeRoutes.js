import Router from 'express';
import { createCooperative, viewSingleCooperative, viewAllCooperatives, searchCooperatives } from '../controllers/cooperativesController';
import tokenValidator from '../middlewares/tokenValidator';
import { isOperator } from '../middlewares/roleVerifier';
import { cooperativeValidator, validateForm } from '../middlewares/formValidations';
import { isIdSafeInteger } from '../middlewares/sanitizer';

const router = Router();

router.post('/new', tokenValidator, isOperator, cooperativeValidator, validateForm, createCooperative);

router.get('/:id', tokenValidator, isOperator, isIdSafeInteger, viewSingleCooperative);

router.get('/', tokenValidator, isOperator, viewAllCooperatives);

router.get('/search/:key', tokenValidator, isOperator, searchCooperatives);

export default router;
