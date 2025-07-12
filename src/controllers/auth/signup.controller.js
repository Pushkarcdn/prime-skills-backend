import successResponse from "../../utils/responses/successResponse.js";
import { ConflictException, HttpException } from "../../exceptions/index.js";
import { initiateEmailVerification } from "./emailVerification.controller.js";

import models from "../../models/index.js";

const { Users } = models;

const signupUser = async (req, res, next) => {
  try {
    const payload = req.body;

    if (payload?.role !== "jobSeeker" && payload?.role !== "recruiter") {
      throw new HttpException(400, "Invalid role!", "auth");
    }

    const existingUser = await Users.findOne({
      where: { email: payload.email },
    });

    if (existingUser) throw new ConflictException("duplicateData", "user");

    payload.username = payload.email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    const newUser = await Users.create({ ...payload, ip: req.ip });

    initiateEmailVerification(newUser, req.ip);

    return successResponse(res, {}, "Signup successful!", "Signup");
  } catch (error) {
    next(error);
  }
};

export default {
  signupUser,
};
