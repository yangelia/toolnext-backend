import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as ctrl from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';
import { getAllToolsSchema } from '../validations/toolValidation.js';

const router = Router();

/**
 * PUBLIC ROUTES
 */
router.get('/', celebrate(getAllToolsSchema), ctrl.getTools);
router.get('/:id', ctrl.getToolById);

/**
 * PROTECTED ROUTES
 * Інструменти можуть створювати тільки авторизовані користувачі
 */
router.post(
  '/',
  authenticate,
  upload.array('images', 5), // до 5 фото
  ctrl.createTool
);

router.put(
  '/:id',
  authenticate,
  upload.array('images', 5),
  ctrl.updateTool
);

router.delete('/:id', authenticate, ctrl.deleteTool);

export default router;
