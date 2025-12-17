import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as ctrl from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserByIdSchema,
  getUserToolsSchema,
} from '../validations/usersValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users and profiles
 */

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current authorized user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */
router.get('/current', authenticate, ctrl.getCurrentUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get public user profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Public user profile
 *       404:
 *         description: User not found
 */
router.get('/:id', celebrate(getUserByIdSchema), ctrl.getUserById);

/**
 * @swagger
 * /users/{id}/tools:
 *   get:
 *     summary: Get tools created by user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's tools
 *       404:
 *         description: User or tools not found
 */
router.get('/:id/tools', celebrate(getUserToolsSchema), ctrl.getUserTools);

export default router;
