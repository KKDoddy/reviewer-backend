import Router from 'express';
import passport from 'passport';
import authController from '../controllers/authController';
import tokenValidator from '../middlewares/tokenValidator';
import {validateUniques, validateUpdateUniques} from '../middlewares/validateEmailOrUsername';
import { isOperator, isManager, isCommuter } from '../middlewares/roleVerifier';
import  { signupValidator, signinValidator, coopMemberSignupValidator, validateForm, profileUpdateValidator } from '../middlewares/formValidations';
import { isIdSafeInteger, prepIdForValidations } from '../middlewares/sanitizer';
import { validateCooperativeId } from '../middlewares/cooperativeValiations';

const router = Router();

        // LOCAL AUTHENTICATION ROUTES

//commuter signup route
router.post('/signup', signupValidator, validateForm, validateUniques, authController.signup);
router.put('/updateProfile', tokenValidator, isCommuter, profileUpdateValidator, validateForm, validateUpdateUniques, authController.updateProfile);

//manager signup route
router.post('/signup/manager', tokenValidator, isOperator, coopMemberSignupValidator, validateForm, validateUniques, prepIdForValidations, isIdSafeInteger, validateCooperativeId, authController.managerSignup);

//driver signup route
router.post('/signup/driver', tokenValidator, isManager, signupValidator, validateForm, validateUniques, authController.driverSignup);

//all accounts routes
router.post('/login', signinValidator, validateForm, authController.signin);
router.post('/logout',tokenValidator, authController.logout);

        //SOCIAL AUTH
router.get('/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.handleSocialAuth);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), authController.handleSocialAuth);

export default router;
