import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as ctrl from '../controllers/authController.js';
import {
  loginSchema,
  registerSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Email already exists
 */
router.post('/register', celebrate(registerSchema), ctrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', celebrate(loginSchema), ctrl.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Logout successful
 */
router.post('/logout', ctrl.logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh session tokens
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Session refreshed
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh', ctrl.refresh);

/**
 * @swagger
 * /auth/reset-email:
 *   post:
 *     summary: Request password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post(
  '/reset-email',
  celebrate(requestResetEmailSchema),
  ctrl.requestResetEmail,
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: reset-token-example
 *               password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password successfully reset
 */
router.post(
  '/reset-password',
  celebrate(resetPasswordSchema),
  ctrl.resetPassword,
);

export default router;
