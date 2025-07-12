import GoogleStrategy from "passport-google-oauth20";
import { oauth } from "../configs/env.config.js";
import models from "../models/index.js";

const { Users } = models;

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, {
      userId: user.userId,
    });
  });

  passport.deserializeUser(async (userObj, done) => {
    try {
      const { userId } = userObj;
      let user = null;

      user = await Users.findOne({ _id: userId });

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: oauth.google.clientId,
        clientSecret: oauth.google.clientSecret,
        callbackURL: "/api/auth/google/callback",
        passReqToCallback: true,
        session: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const { id } = profile;
          let user = null;

          user = await Users.findOne({ oAuthId: id });

          if (!user) {
            console.log("User not found, checking email");
            user = await Users.findOne({ email: profile.emails[0].value });
          }

          if (user?._id && !user.oAuthId) {
            console.log("User found, updating user");

            user.oAuthId = id;
            user.oAuthProvider = "google";
            user.isEmailVerified = true;
            await user.save();
          }

          if (!user) {
            console.log("Creating new user");
            user = await Users.create({
              oAuthId: id,
              oAuthProvider: "google",
              username: profile.emails[0]?.value?.split("@")[0]?.toLowerCase(),
              email: profile.emails[0].value,
              isEmailVerified: true,
              firstName: profile.name.givenName || "User",
              lastName: profile.name.familyName || "User",
              profileImage: profile?.photos[0]?.value || null,
              isTermsAndConditionsAccepted: true,
              ip: req.ip,
            });
          }

          return done(null, user);
        } catch (err) {
          console.error("Google OAuth Error:", err);
          return done(err, null);
        }
      },
    ),
  );
};
