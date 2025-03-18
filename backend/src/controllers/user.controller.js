import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { nanoid } from "nanoid";

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

export { registerUser };
