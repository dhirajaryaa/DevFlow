import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

export const userRouter = Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
// protected routes 
userRouter.post("/logout",verifyJWT,logoutUser);

