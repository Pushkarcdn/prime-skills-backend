import passport from "passport";

import { processAuth } from "../../controllers/auth/signin.controller.js";

export default (router) => {
  router.route("/auth/google/callback").get((req, res, next) => {
    passport.authenticate("google", { session: true }, (err, user) => {
      if (err) {
        console.error("Google oauth error:", err);
        return res.redirect(`${process.env.FRONTEND_URL}/auth/sign-in`);
      }

      if (!user) {
        console.error("No user found!");
        return res.redirect(`${process.env.FRONTEND_URL}/auth/sign-in`);
      }

      try {
        // Login the user
        req.login(user, async (loginErr) => {
          if (loginErr) {
            console.error("Google oauth login error: ", loginErr);
            return res.redirect(`${process.env.FRONTEND_URL}/auth/sign-in`);
          }

          processAuth(req, res, next, user, "redirect");
        });
      } catch (error) {
        console.error("Error in Google oauth callback:", error);
        return res.redirect(`${process.env.FRONTEND_URL}/auth/sign-in`);
      }
    })(req, res, next);
  });

  router.route("/auth/google").get((req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next);
  });
};
