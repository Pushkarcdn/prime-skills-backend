import SignupController from "../../controllers/auth/signup.controller.js";
import SigninController from "../../controllers/auth/signin.controller.js";
import RefreshController from "../../controllers/auth/refresh.controller.js";
import SignoutController from "../../controllers/auth/signout.controller.js";
import BackupController from "../../controllers/auth/backup.controller.js";
import ProfileController from "../../controllers/auth/profile.controller.js";
import PasswordController from "../../controllers/auth/password.controller.js";

export default (router) => {
  router.route("/auth/signup").post(SignupController.signupUser);

  router.route("/auth/signin").post(SigninController.signInUser);

  router.route("/auth/refresh").get(RefreshController.refreshUserToken);

  router.route("/auth/signout").get(SignoutController.signOutUser);

  router.route("/auth/reset-superadmin").get(BackupController.resetSuperAdmin);

  router.route("/auth/me").get(ProfileController.currentUser);

  router
    .route("/auth/update-my-profile")
    .put(ProfileController.updateMyProfile);

  router
    .route("/auth/change-my-password")
    .put(PasswordController.changeMyPassword);
};
