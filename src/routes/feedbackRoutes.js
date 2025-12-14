import { Router } from 'express';
import * as ctrl from '../controllers/feedbackController.js';
import { authenticate as authMiddleware } from '../middleware/authenticate.js';

const router = Router();

router.post('/', authMiddleware, ctrl.createFeedback);
router.get('/tool/:toolId', ctrl.getToolFeedbacks);
router.delete('/:feedbackId', authMiddleware, ctrl.deleteFeedback);

export default router;
