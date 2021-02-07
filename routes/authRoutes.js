import Router from 'express';
import passport from 'passport';
import authController from '../controllers/authController';
import tokenValidator from '../middlewares/tokenValidator';
import validateEmailOrUsername from '../middlewares/validateEmailOrUsername';
import { isOperator } from '../middlewares/roleVerifier';
import  { signupValidator, signinValidator, managerSignupValidator } from '../middlewares/formValidations';

const router = Router();

        // LOCAL AUTHENTICATION ROUTES

//commuter signup route
router.post('/signup', signupValidator, validateEmailOrUsername, authController.signup);

//manager signup route
router.post('/signup/manager', tokenValidator, isOperator, managerSignupValidator, validateEmailOrUsername, authController.managerSignup);

//all accounts routes
router.post('/login', signinValidator, authController.signin);
router.post('/logout',tokenValidator, authController.logout);

        //SOCIAL AUTH
router.get('/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.handleSocialAuth);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), authController.handleSocialAuth);

export default router;
