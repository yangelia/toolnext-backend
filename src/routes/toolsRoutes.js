import { Router } from 'express';
import { createTool } from '../controllers/toolsController.js'; // ← виправлено
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

/**
 * PROTECTED ROUTES
 * Інструменти можуть створювати тільки авторизовані користувачі
 */
router.post(
  '/',
  authenticate,
  upload.array('images', 5), // до 5 фото
  createTool
);

export default router;
