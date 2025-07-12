import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { jwtConfig } from "../configs/env.config.js";
import { isUserAllowed } from "../configs/permission.js";

import models from "../models/index.js";

const { AccessTokens, Users } = models;

let extractedAccessToken = null;

export const extractAccessToken = (req) => {
  const extractedAccessToken = req?.cookies?.accessToken || null;
  return extractedAccessToken;
};

export const extractRefreshToken = (req) => {
  const extractedRefreshToken = req?.cookies?.refreshToken || null;
  return extractedRefreshToken;
};

// Options for JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractAccessToken]),
  secretOrKey: jwtConfig.accessTokenSecret,
  algorithms: ["HS256"],
  passReqToCallback: true, // Enables req access in callback
};

const jwtPassportConfig = (passport) => {
  passport.use(
    new JwtStrategy(
      opts,
      /**
       * Passport callback function with req
       * @param {import('express').Request} req - Express request object
       * @param {Object} jwt_payload - Decoded JWT payload
       * @param {Function} done - Passport callback
       */
      async (req, jwt_payload, done) => {
        try {
          const { sub } = jwt_payload;

          extractedAccessToken = extractAccessToken(req);

          if (!extractedAccessToken) return done(null, false);

          const user = await Users?.findOne({
            _id: sub,
          }).lean();

          if (!user) return done(null, false);

          // Fetch the access token information
          const accessTokenRecord = await AccessTokens?.findOne({
            accessToken: extractedAccessToken,
            isActive: true,
          });

          if (!accessTokenRecord) return done(null, false);

          // Check if the user is allowed to access the resource
          const route = req.originalUrl;
          const method = req.method;

          const isAllowed = await isUserAllowed(route, method, user?.role);

          if (!isAllowed) return done(null, false);

          // Remove sensitive information before returning
          delete user?.password;

          // Return authenticated user
          return done(null, user);
        } catch (err) {
          // In case of error, pass it to done()
          console.error("Error in jwt.passport.js: ", err);
          return done(err, false);
        }
      },
    ),
  );
};

export default jwtPassportConfig;
