import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/index.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import fs from "fs";
import { loadEnvFile } from "process";

// configure cloudinary
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

// upload Avatar on Cloudinary
const uploadOnCloudinary = AsyncHandler(async (localFilePath) => {
  if (!localFilePath) {
    throw new ApiError(400, "File don't Exist");
  }
  const res = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto",
  });
  await fs.unlinkSync(localFilePath);
  return res;
});

const removeFromCloudinary = AsyncHandler(async function (publicId) {
  if (!publicId) {
    throw new ApiError(400, "Public Id Missing!");
  }
  const res = await cloudinary.uploader.destroy(publicId);

  return res
})

export { uploadOnCloudinary,removeFromCloudinary };
