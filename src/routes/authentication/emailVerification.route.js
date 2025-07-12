import {
  resendVerificationEmail,
  verifyEmail,
} from "../../controllers/auth/emailVerification.controller.js";

export default (router) => {
  router
    .route("/auth/resend-verification-email/:email")
    .get(resendVerificationEmail);

  router.route("/auth/verify-email/:token").get(verifyEmail);
};
