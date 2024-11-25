import { RequestHandler } from "express";

import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

import { AccessTokenPayload, verifyToken } from "../utils/jwt";
import appAssert from "../utils/appAssert";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;

  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not Authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken<AccessTokenPayload>(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
