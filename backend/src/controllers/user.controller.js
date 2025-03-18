import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { nanoid } from "nanoid";
import { tokenOptions } from "../config/index.js";

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = AsyncHandler(async function (req, res) {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    throw new ApiError(400, "All Fields Are Required!");
  }
  //   check userexist or not
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new ApiError(400, "User already exists", {
      userId: userExist._id,
      name: userExist.name,
      email: userExist.email,
    });
  }
  // generate username
  const username = `${name.split(" ")[0]}-${nanoid(8)}`;
  //   create user
  const newUser = await User.create({
    name,
    email,
    username,
    password,
  });
  const user = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const loginUser = AsyncHandler(async function (req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "All Fields Are Required!");
  }
  //   check user exist or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User not exists");
  }
  // check password correct or not
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password Incorrect!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, tokenOptions)
    .cookie("refreshToken", refreshToken, tokenOptions)
    .json(
      new ApiResponse(200, "user Login Successful", {
        user: loginUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = AsyncHandler(async function (req, res) {
  const user = await User.findById(req?.user?._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .clearCookie("accessToken", tokenOptions)
    .clearCookie("refreshToken", tokenOptions)
    .json(new ApiResponse(200, "User logout successful", {}));
});

const refreshAccessToken = AsyncHandler(async function (req, res) {
  const user = await User.findById(req?.user?._id);

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, tokenOptions)
    .cookie("refreshToken", refreshToken, tokenOptions)
    .json(
      new ApiResponse(200, "Access Token Refresh Successful", {
        user: loginUser,
        accessToken,
        refreshToken,
      })
    );
});

const checkUserAuth = AsyncHandler(async function (req, res) {
  const user = await User.findById(req?.user?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  return res.status(200).json(new ApiResponse(200, "User is Authorized", user));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken,checkUserAuth };
