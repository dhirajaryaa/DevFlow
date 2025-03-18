import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser'
import { corsConfig } from './config';

const app = express();

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

app.use(cookieParser({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set to true in production
    sameSite: 'strict'
}));

app.use(express.static("./public"));


export default app