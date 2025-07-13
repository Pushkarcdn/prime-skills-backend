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

    let existingUser = await Users.findOne({
      email: payload.email,
    });

    if (existingUser)
      throw new ConflictException(
        "User with this email already exists!",
        "user",
      );

    payload.username =
      payload?.username ||
      payload.email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();

    existingUser = await Users.findOne({
      username: payload.username,
    });

    if (existingUser)
      throw new ConflictException("Username not available!", "user");

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
