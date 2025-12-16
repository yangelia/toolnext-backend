import { Router } from 'express';
import * as ctrl from '../controllers/feedbackController.js';
import { authenticate as authMiddleware } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { feedbackSchema } from '../validations/feedbackValidation.js';

const router = Router();

router.get('/', ctrl.getAllFeedbacks);
router.get('/:toolId',celebrate(feedbackSchema.getTool), ctrl.getToolFeedbacks);
router.post('/:toolId', authMiddleware,celebrate(feedbackSchema.createWithParams), ctrl.createFeedback);
router.delete('/:feedbackId', authMiddleware, ctrl.deleteFeedback);

export default router;
