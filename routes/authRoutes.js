import Router from 'express';
import passport from 'passport';
import authController from '../controllers/authController';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

// local authentication
router.post('/signup', authController.signup);
router.post('/login', authController.signin);
router.post('/logout',tokenValidator, authController.logout);

//social auth
router.get('/google', passport.authenticate('google',{ scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.handleSocialAuth);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), authController.handleSocialAuth);

export default router;
