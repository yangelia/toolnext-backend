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
 */
router.get('/', celebrate(getAllToolsSchema), ctrl.getAllTools);

/**
 * @swagger
 * /tools/{toolId}:
 *   get:
 *     summary: Get tool by ID
 *     tags: [Tools]
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
 */
router.post(
  '/',
  authenticate,
  upload.array('images', 5),
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
 */
router.patch(
  '/:id',
  authenticate,
  upload.array('images', 5),
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
 */
router.delete(
  '/:id',
  authenticate,
  celebrate(toolIdParamsSchema),
  ctrl.deleteTool,
);

export default router;
