import { AuthException } from "../../exceptions/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { frontend } from "../../configs/env.config.js";
import { signAccessToken, signRefreshToken } from "../../lib/jwt.js";

import models from "../../models/index.js";

const { Users, AccessTokens, RefreshTokens } = models;

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (!existingUser) throw new AuthException("Invalid credentials!", "auth1");

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) throw new AuthException("Invalid credentials!", "auth2");

    processAuth(req, res, next, existingUser, "response");
  } catch (error) {
    next(error);
  }
};

export const processAuth = async (
  req,
  res,
  next,
  user,
  responseType = "response",
) => {
  try {
    const newAccessToken = await signAccessToken({
      userId: user?._id,
    });

    const newRefreshToken = await signRefreshToken({
      userId: user?._id,
    });

    let accessTokenPayload = {
      userId: user?._id,
      accessToken: newAccessToken,
      ip: req?.ip,
    };

    let refreshTokenPayload = {
      userId: user?._id,
      refreshToken: newRefreshToken,
      ip: req?.ip,
    };

    await AccessTokens.create(accessTokenPayload);
    await RefreshTokens.create(refreshTokenPayload);

    // Update last login time
    Users.updateOne({ _id: user?._id }, { lastLogin: new Date() }).catch(
      (err) => console.error("Error updating last login: ", err),
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    if (responseType === "redirect") {
      // Redirect to frontend
      const redirectUrl = `${frontend.url}`;
      return res.redirect(redirectUrl);
    } else {
      return successResponse(res, {}, "Signin successful!", "auth");
    }
  } catch (error) {
    next(error);
  }
};

export default { signInUser };
