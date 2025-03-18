import { Router } from "express";
import {
  checkUserAuth,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
// protected routes
userRouter.post("/token", verifyJWT, refreshAccessToken);
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/auth", verifyJWT, checkUserAuth);
userRouter.put(
  "/profile/avatar",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  verifyJWT,
  updateUserAvatar
);
