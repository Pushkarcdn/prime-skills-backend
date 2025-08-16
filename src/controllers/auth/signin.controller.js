import { AuthException } from "../../exceptions/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { frontend } from "../../configs/env.config.js";
import { signAccessToken, signRefreshToken } from "../../lib/jwt.js";
import { jwtConfig } from "../../configs/env.config.js";
import { convertJwtTimeToSeconds } from "../../utils/helpers/timeFormatters.js";

import models from "../../models/index.js";

const { Users, AccessTokens, RefreshTokens } = models;

const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (!existingUser) throw new AuthException("Invalid credentials!", "auth");

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) throw new AuthException("Invalid credentials!", "auth");

    if (!existingUser.isEmailVerified)
      throw new AuthException(
        "Please verify your email following the link sent to your email and try again!",
        "auth",
      );

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

    await RefreshTokens.create(refreshTokenPayload);
    await AccessTokens.create(accessTokenPayload);

    const accessTokenExpiry = jwtConfig.accessTokenExpiresIn;

    const accessTokenExpiryInSeconds =
      convertJwtTimeToSeconds(accessTokenExpiry);

    // remove old access tokens of this user that are expired
    await req.redis.zRemRangeByScore(
      `accessToken:${user?._id}`,
      0,
      Date.now() - accessTokenExpiryInSeconds * 1000,
    );

    // add new access token to redis
    await req.redis.zAdd(`accessToken:${user?._id}`, {
      value: newAccessToken,
      score: Date.now() + accessTokenExpiryInSeconds * 1000,
    });

    // Update last login time
    Users.updateOne({ _id: user?._id }, { lastLogin: new Date() }).catch(
      (err) => console.error("Error updating last login: ", err),
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    if (responseType === "redirect") {
      // Redirect to frontend
      const redirectUrl = `${frontend.url}`;
      return res.redirect(redirectUrl);
    } else {
      return successResponse(
        res,
        { role: user?.role },
        "Signin successful!",
        "auth",
      );
    }
  } catch (error) {
    next(error);
  }
};

export default { signInUser };
