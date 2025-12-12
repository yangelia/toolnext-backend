import { Router } from 'express';
import * as ctrl from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js'; // multer
import { authenticate } from '../middleware/authenticate.js'; // інструменти створюють авторизовані
import { celebrate } from 'celebrate';
import { updateToolSchema } from '../validations/toolValidation.js';

const router = Router();

// PUBLIC ROUTES
router.get('/', ctrl.getTools);
router.get('/:id', ctrl.getToolById);

// PROTECTED ROUTES
router.post('/', authenticate, upload.single('image'), ctrl.createTool);
router.patch(
  '/:id',
  upload.single('image'),
  celebrate(updateToolSchema),
  ctrl.updateTool,
);
// router.patch(
//   '/:id',
//   authenticate,
//   upload.single('image'),
//   celebrate(updateToolSchema),
//   ctrl.updateTool,
// );
router.delete('/:id', authenticate, ctrl.deleteTool);

export default router;
