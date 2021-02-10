import Router from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import { isCommuter, isDriver, canViewReviews } from '../middlewares/roleVerifier';
import { isIdSafeInteger, prepIdForValidations } from '../middlewares/sanitizer';
import { isDriverRideOwner, isCommuterRideOwner } from '../middlewares/checkOwnership';
import { reviewValidator, validateForm } from '../middlewares/formValidations';
import { saveReview, editReview, viewReviews, deleteReview, viewSingleReview, viewDriverReviews } from '../controllers/reviewController';

const router = Router();

router.post('/new', tokenValidator, isCommuter, reviewValidator, validateForm, prepIdForValidations, isIdSafeInteger, isCommuterRideOwner, saveReview);

router.get('/:id', tokenValidator, canViewReviews, isIdSafeInteger, viewSingleReview);

router.put('/:id/edit', tokenValidator, isCommuter, isIdSafeInteger, reviewValidator, validateForm, prepIdForValidations, isIdSafeInteger, isCommuterRideOwner, editReview);

router.delete('/:id', tokenValidator, isCommuter, isIdSafeInteger, isCommuterRideOwner, deleteReview);

router.get('/', tokenValidator, canViewReviews, viewReviews);

router.get('/drivers/:id', tokenValidator, canViewReviews, isIdSafeInteger, viewDriverReviews);

export default router;
