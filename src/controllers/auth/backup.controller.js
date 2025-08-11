import successResponse from "../../utils/responses/successResponse.js";
import { superAdmin } from "../../configs/env.config.js";
import models from "../../models/index.js";

const { Users } = models;

const resetSuperAdmin = async (req, res, next) => {
  try {
    await Users.deleteMany({ role: ["admin", "superAdmin"] });

    const superAdminPayload = {
      role: "superAdmin",
      username: "superAdmin",
      firstName: "Super",
      lastName: "Admin",
      email: superAdmin.email,
      password: superAdmin.password,
      isEmailVerified: true,
      profileImage: `https://primeskills.pushkar.live/logo.png`,
      ip: req.ip,
      isTermsAndConditionsAccepted: true,
    };

    await Users.create(superAdminPayload);

    return successResponse(res, "Success!", "update", "settings");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  resetSuperAdmin,
};
