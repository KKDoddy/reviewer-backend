import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.G_CLIENT_ID,
            clientSecret: process.env.G_CLIENT_SECRET,
            callbackURL: process.env.G_CALLBACK_URL
        },
        (accessToken, refreshToken, profile, cb) => {
            // console.log(profile);
            cb(null, profile);
        })
);