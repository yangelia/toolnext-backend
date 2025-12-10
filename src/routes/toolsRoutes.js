import { Router } from 'express';
import * as ctrl from '../controllers/toolsController.js';

const router = Router();

router.get('/', ctrl.getTools);
router.get('/:id', ctrl.getToolById);
router.post('/', ctrl.createTool);
router.patch('/:id', ctrl.updateTool);
router.delete('/:id', ctrl.deleteTool);

export default router;
