const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')

require('dotenv').config();

passport.use(
    new GoogleStrategy({
        // option for the google strat
        clientID : "315807129935-htp61p2up1jdck0d5qavsv3bvnel8kkb.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
    } , function (request,accessToken, refreshToken, profile, done) {
        request.session.authenticated = true;
        return done(null,profile);
    })
)

passport.serializeUser((user,done) => {
    const formatUser = {
        id : user.id,
        Email : user.emails[0].value,
        Username : user.displayName
    }
    done(null,formatUser)
})

passport.deserializeUser((user,done) => {
    
    done(null,user)
})