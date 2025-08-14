import { AuthException, HttpException } from "../../exceptions/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { signGeneralToken, verifyGeneralToken } from "../../lib/jwt.js";
import { backend, frontend } from "../../configs/env.config.js";

import models from "../../models/index.js";
import sendEmail from "../../utils/mail/nodeMailer.js";
import { processAuth } from "./signin.controller.js";
const { Tokens, Users } = models;

const initiateEmailVerification = async (user, ip) => {
  try {
    const verificationToken = await signGeneralToken({
      userId: user._id,
      type: "emailVerification",
      ip,
    });

    // save the token in the database
    const tokenPayload = {
      userId: user._id,
      token: verificationToken,
      type: "emailVerification",
      ip,
    };

    await Tokens.create(tokenPayload);

    // send mail
    const mailData = {
      reciever: user.email,
      subject: "Verify your email!",
      templateFile: "emailVerificationMail.ejs",
      variables: {
        name: user.firstName,
        role: user.role,
        link: `${backend.url}/api/auth/verify-email/${verificationToken}`,
      },
      priority: "normal",
    };

    await sendEmail(mailData);
  } catch (error) {
    console.error(error);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.params || {};

    const existingUser = await Users.findOne({
      email,
    });

    if (!existingUser) {
      throw new HttpException(
        404,
        "User with this email not found!",
        "email verification",
      );
    }

    if (existingUser?.isEmailVerified) {
      throw new HttpException(
        400,
        "Email already verified!",
        "email verification",
      );
    }

    initiateEmailVerification(existingUser, req.ip);

    return successResponse(
      res,
      {},
      "Verification email sent!",
      "email verification",
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const verificationToken = req.params.token;

    const tokenData = await verifyGeneralToken(verificationToken);
    if (!tokenData)
      return res.redirect(`${frontend.url}/auth/email-verification/failed`);

    const savedToken = await Tokens.findOne({
      token: verificationToken,
      type: "emailVerification",
      isUsed: false,
      isActive: true,
    });

    if (!savedToken) {
      return res.redirect(`${frontend.url}/auth/email-verification/failed`);
    }

    const user = await Users.findOne({
      _id: savedToken.userId,
    });

    user.isEmailVerified = true;
    await user.save();

    savedToken.isUsed = true;
    savedToken.isActive = false;

    await savedToken.save();

    processAuth(req, res, next, user, "redirect");
  } catch (error) {
    console.error(error);
    return res.redirect(`${frontend.url}/auth/email-verification/failed`);
  }
};

export { initiateEmailVerification, resendVerificationEmail, verifyEmail };
