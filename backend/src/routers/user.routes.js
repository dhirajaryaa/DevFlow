import {Router} from "express"
import { checkUserAuth, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

export const userRouter = Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
// protected routes 
userRouter.post("/token",verifyJWT,refreshAccessToken);
userRouter.post("/logout",verifyJWT,logoutUser);
userRouter.get("/auth",verifyJWT,checkUserAuth);

