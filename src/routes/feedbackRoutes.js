import { Router } from 'express';
import * as ctrl from '../controllers/feedbackController.js';

const router = Router();

router.post('/:toolId', ctrl.createFeedback);
router.get('/:toolId', ctrl.getToolFeedbacks);

export default router;
