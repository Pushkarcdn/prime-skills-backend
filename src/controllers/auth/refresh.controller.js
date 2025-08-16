import successResponse from "../../utils/responses/successResponse.js";
import { AuthException, NotFoundException } from "../../exceptions/index.js";
import { extractRefreshToken } from "../../passport/jwt.passport.js";

import models from "../../models/index.js";
import { signAccessToken, verifyRefreshToken } from "../../lib/jwt.js";
import { jwtConfig } from "../../configs/env.config.js";
import { convertJwtTimeToSeconds } from "../../utils/helpers/timeFormatters.js";

const { Users, AccessTokens, RefreshTokens } = models;

const refreshUserToken = async (req, res, next) => {
  try {
    const extractedRefreshToken = extractRefreshToken(req);

    if (!extractedRefreshToken)
      throw new NotFoundException("No refresh token found!", "auth");

    const refreshTokenPayload = await verifyRefreshToken(extractedRefreshToken);

    if (!refreshTokenPayload?.sub)
      throw new AuthException("invalidRefreshToken", "auth");

    const existingRefreshToken = await RefreshTokens.findOne({
      refreshToken: extractedRefreshToken,
      isActive: true,
    }).lean();

    if (
      !existingRefreshToken ||
      existingRefreshToken?.userId?.toString() !==
        refreshTokenPayload?.sub?.toString()
    )
      throw new AuthException("invalidRefreshToken", "auth");

    const existingUser = await Users.findOne({
      _id: existingRefreshToken?.userId,
    }).lean();

    if (!existingUser) throw new AuthException("invalidRefreshToken", "auth");

    const newAccessToken = await signAccessToken({
      userId: existingUser?._id,
    });

    const accessTokenPayload = {
      userId: existingUser?._id,
      accessToken: newAccessToken,
      ip: req?.ip,
    };

    await AccessTokens.create(accessTokenPayload);

    const accessTokenExpiry = jwtConfig.accessTokenExpiresIn;

    const accessTokenExpiryInSeconds =
      convertJwtTimeToSeconds(accessTokenExpiry);

    // remove old access tokens of this user that are expired
    await req.redis.zRemRangeByScore(
      `accessToken:${existingUser?._id}`,
      0,
      Date.now() - accessTokenExpiryInSeconds * 1000,
    );

    // add new access token to redis
    await req.redis.zAdd(`accessToken:${existingUser?._id}`, {
      value: newAccessToken,
      score: Date.now() + accessTokenExpiryInSeconds * 1000,
    });

    // Update last login time
    Users.updateOne(
      { _id: existingUser?._id },
      { lastLogin: new Date() },
    ).catch((err) => console.error("Error updating last login: ", err));

    await RefreshTokens.updateOne(
      {
        _id: existingRefreshToken?._id,
      },
      { timesUsed: (Number(existingRefreshToken?.timesUsed) || 0) + 1 },
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      priority: "high",
      maxAge: accessTokenExpiryInSeconds * 1000,
    });

    return successResponse(
      res,
      "Token refreshed successfully!",
      "tokenRefreshed",
      "Refresh",
    );
  } catch (error) {
    next(error);
  }
};

export default {
  refreshUserToken,
};
