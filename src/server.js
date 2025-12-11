import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_DOMAIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(logger);

// routes
app.use('/auth', authRoutes);
app.use('/tools', toolsRoutes);
app.use('/users', userRoutes);

// 404
app.use(notFoundHandler);

// errors
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
