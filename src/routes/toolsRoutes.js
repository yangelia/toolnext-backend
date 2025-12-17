import { Router } from 'express';
import * as ctrl from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js'; // multer
import { authenticate } from '../middleware/authenticate.js'; // інструменти створюють авторизовані

import { celebrate } from 'celebrate';
import {
  toolIdParamsSchema,
  updateToolSchema,
  getAllToolsSchema,
  toolIdSchema,
  createToolSchema,
} from '../validations/toolValidation.js';

const router = Router();

// PUBLIC ROUTES
router.get('/', celebrate(getAllToolsSchema), ctrl.getTools);
router.get('/:toolId', celebrate(toolIdSchema), ctrl.getToolById);

// PROTECTED ROUTES
router.post(
  '/',
  authenticate,
  upload.single('image'),
  celebrate(createToolSchema),
  ctrl.createTool,
);
router.patch(
  '/:id',
  authenticate,
  upload.single('image'),
  celebrate(updateToolSchema),
  ctrl.updateTool,
);
router.delete(
  '/:id',
  authenticate,
  celebrate(toolIdParamsSchema),
  ctrl.deleteTool,
);

export default router;
