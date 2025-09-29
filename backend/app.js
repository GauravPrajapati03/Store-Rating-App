import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import cookieParser from "cookie-parser";


import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import storeRoutes from "./src/routes/storeRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";

const app = express();

const CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CorsOptions));
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);


export default app;