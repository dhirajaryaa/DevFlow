import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const config = Object.freeze({
  port: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGODB_URI,
  db_name: process.env.DB_NAME,
});

const cloudinaryConfig = Object.freeze({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
});

const jwtConfig = Object.freeze({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
});

const corsConfig = Object.freeze({
  production: process.env.PRODUCTION === "true",
  methods: process.env.METHODS ? process.env.METHODS.split(",") : [],
  allowedUrl: process.env.ALLOWED_URL ? process.env.ALLOWED_URL.split(",") : [],
});

const tokenOptions = Object.freeze({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
});

export { config, cloudinaryConfig, jwtConfig, corsConfig, tokenOptions };
