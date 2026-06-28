 require ("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: (process.env.GOOGLE_CLIENT_ID),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET),
      callbackURL:"https://my-portfolio-la7j.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value
        if (!email) {
          return done(new Error("Google profile has no email"), null);
        }

        const profilePhoto = profile.photos?.[0]?.value;
        const givenName = profile.name?.givenName;
        const familyName = profile.name?.familyName;
        const locale = profile._json?.locale || profile.locale;

        let user = await User.findOne({ email });
     
        if (!user) {
          user = await User.create({
            name: profile.displayName || [givenName, familyName].filter(Boolean).join(' '),
            email,
            googleId: profile.id,
            provider: 'google',
            isVerified: true,
            photo: profilePhoto,
            givenName,
            familyName,
            locale,
          });
        } else {
          user.googleId = user.googleId || profile.id;
          if(!user.provider){
            user.provider = 'google';
          }
          user.photo = user.photo || profilePhoto;
          user.givenName = user.givenName || givenName;
          user.familyName = user.familyName || familyName;
          user.locale = user.locale || locale;
          if (!user.name || user.name === '') {
            user.name = profile.displayName || [givenName, familyName].filter(Boolean).join(' ');
          }
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;


