import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { jwtConfig } from "../config/index.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandler(async function (req, res, next) {
  const incomingToken =
    req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[0];
  if (!incomingToken) {
    throw new ApiError(400, "Invalid Credential");
  }
  const decodedToken = await jwt.verify(
    incomingToken,
    jwtConfig.accessTokenSecret
  );
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized");
  }
  
  req.user = decodedToken;
  next();
});
