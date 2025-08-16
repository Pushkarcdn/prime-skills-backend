import { AuthException } from "../../exceptions/index.js";
import successResponse from "../../utils/responses/successResponse.js";

import models from "../../models/index.js";
import {
  extractAccessToken,
  extractRefreshToken,
} from "../../passport/jwt.passport.js";

const { AccessTokens, RefreshTokens } = models;

const signOutUser = async (req, res, next) => {
  try {
    const accessTokenFromCookie = extractAccessToken(req);
    const refreshTokenFromCookie = extractRefreshToken(req);

    if (!accessTokenFromCookie && !refreshTokenFromCookie)
      throw new AuthException("Signed out already!", "signout");

    // remove access token from redis
    await req.redis.zRem(`accessToken:${req.user._id}`, accessTokenFromCookie);

    await AccessTokens.findOneAndUpdate(
      { accessToken: accessTokenFromCookie },
      {
        isActive: false,
      },
    );

    await RefreshTokens.findOneAndUpdate(
      { refreshToken: refreshTokenFromCookie },
      {
        isActive: false,
      },
    );

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      priority: "high",
      maxAge: 0,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/api/auth/refresh",
      priority: "high",
      maxAge: 0,
    });

    return successResponse(
      res,
      "User signed out successfully!",
      "loggedOut",
      "auth.signout",
    );
  } catch (error) {
    next(error);
  }
};

export default { signOutUser };
