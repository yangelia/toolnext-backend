import { Router } from 'express';
import { createTool } from '../controllers/toolsController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post(
  '/',
  authenticate,
  upload.array('images', 5),
  createTool
);

export default router;
