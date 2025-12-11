import { Router } from 'express';
import * as ctrl from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js'; // multer
import { authenticate } from '../middleware/authenticate.js'; // інструменти створюють авторизовані

const router = Router();

// PUBLIC ROUTES
router.get('/', ctrl.getTools);
router.get('/:id', ctrl.getToolById);

// PROTECTED ROUTES
router.post('/', authenticate, upload.single('image'), ctrl.createTool);
router.patch('/:id', authenticate, upload.single('image'), ctrl.updateTool);
router.delete('/:id', authenticate, ctrl.deleteTool);

export default router;
