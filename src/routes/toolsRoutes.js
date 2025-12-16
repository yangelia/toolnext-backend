import { Router } from 'express';
import * as ctrl from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';

import {
  toolIdParamsSchema,
  updateToolSchema,
  getAllToolsSchema,
  toolIdSchema,
} from '../validations/toolValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tools
 *   description: Tools management
 */

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Get all tools
 *     tags: [Tools]
 *     responses:
 *       200:
 *         description: List of tools
 */
router.get('/', celebrate(getAllToolsSchema), ctrl.getTools);

/**
 * @swagger
 * /tools/{toolId}:
 *   get:
 *     summary: Get tool by ID
 *     tags: [Tools]
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tool data
 *       404:
 *         description: Tool not found
 */
router.get('/:toolId', celebrate(toolIdSchema), ctrl.getToolById);

/**
 * @swagger
 * /tools:
 *   post:
 *     summary: Create new tool
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tool created
 */
router.post('/', authenticate, upload.single('image'), ctrl.createTool);

/**
 * @swagger
 * /tools/{id}:
 *   patch:
 *     summary: Update tool
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tool updated
 */
router.patch(
  '/:id',
  authenticate,
  upload.single('image'),
  celebrate(updateToolSchema),
  ctrl.updateTool,
);

/**
 * @swagger
 * /tools/{id}:
 *   delete:
 *     summary: Delete tool
 *     tags: [Tools]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tool deleted
 */
router.delete(
  '/:id',
  authenticate,
  celebrate(toolIdParamsSchema),
  ctrl.deleteTool,
);

export default router;
