import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

import authenticate from './middleware/authenticate.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

// connect to DB BEFORE server start
await connectMongoDB();

// global middleware
app.use(logger);
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// auth routes (public)
app.use('/auth', authRoutes);

// notes routes (private)
app.use('/notes', authenticate, notesRoutes);

// 404
app.use(notFoundHandler);

// celebrate validation errors
app.use(errors());

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
