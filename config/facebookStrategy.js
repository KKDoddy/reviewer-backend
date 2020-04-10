import dotenv from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

dotenv.config();

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.F_CLIENT_ID,
            clientSecret: process.env.F_CLIENT_SECRET,
            callbackURL: process.env.F_CALLBACK_URL,
            profileFields: ["id", "displayName", "emails"]
        },
        (accessToken, refreshToken, profile, cb) => {
            cb(null, profile);
        }
    )
);