import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser'
import { corsConfig } from './config/index.js';

export const app = express();

// setup middlewares 
app.use(express.urlencoded({
    extended:true,
}));

app.use(express.json());

app.use(cors({
    origin: corsConfig.allowedUrl,
    methods: corsConfig.methods,
    credentials:true,
}));

app.use(cookieParser());

app.use(express.static("./public"));

// setup Router 
import { userRouter } from './routers/user.routes.js';
app.use("/api/v1/users/",userRouter)

// setup 💀 global error middlewares 
import { errorHandler } from './middlewares/error.middleware.js';
app.use(errorHandler)