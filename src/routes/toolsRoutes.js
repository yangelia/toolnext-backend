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
  createToolSchema,
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
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Comma-separated category IDs
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
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
 *               - name
 *               - pricePerDay
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electric Drill
 *               pricePerDay:
 *                 type: number
 *                 example: 25
 *               category:
 *                 type: string
 *                 example: 64f123abc456def789012345
 *               description:
 *                 type: string
 *                 example: Powerful drill for home use
 *               rentalTerms:
 *                 type: string
 *                 example: Return clean and undamaged
 *               specifications:
 *                 type: string
 *                 example: '{"power":"800W","weight":"2kg"}'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tool created
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  authenticate,
  upload.single('image'),
  celebrate(createToolSchema),
  ctrl.createTool,
);

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
 *               name:
 *                 type: string
 *               pricePerDay:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               rentalTerms:
 *                 type: string
 *               specifications:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tool updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tool not found
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tool not found
 */
router.delete(
  '/:id',
  authenticate,
  celebrate(toolIdParamsSchema),
  ctrl.deleteTool,
);

export default router;
