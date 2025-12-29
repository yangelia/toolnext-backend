import { Router } from 'express';
import * as ctrl from '../controllers/feedbackController.js';
import { authenticate as authMiddleware } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { feedbackSchema } from '../validations/feedbackValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback for tools
 */

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of all feedbacks
 */
router.get('/', ctrl.getAllFeedbacks);

/**
 * @swagger
 * /feedbacks/{toolId}:
 *   get:
 *     summary: Get feedbacks for a specific tool
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     responses:
 *       200:
 *         description: List of feedbacks for the tool
 */
router.get(
  '/:toolId',
  celebrate(feedbackSchema.getTool),
  ctrl.getToolFeedbacks,
);

/**
 * @swagger
 * /feedbacks/{toolId}:
 *   post:
 *     summary: Create feedback for a tool
 *     tags: [Feedback]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Very good tool!
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/:toolId',
  authMiddleware,
  celebrate(feedbackSchema.createWithParams),
  ctrl.createFeedback,
);

/**
 * @swagger
 * /feedbacks/{feedbackId}:
 *   delete:
 *     summary: Delete feedback
 *     tags: [Feedback]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: feedbackId
 *         required: true
 *         schema:
 *           type: string
 *         description: Feedback ID
 *     responses:
 *       204:
 *         description: Feedback deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:feedbackId', authMiddleware, ctrl.deleteFeedback);

export default router;
