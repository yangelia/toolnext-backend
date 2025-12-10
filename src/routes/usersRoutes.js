import { Router } from 'express';
import * as ctrl from '../controllers/usersController.js';

const router = Router();

router.get('/current', ctrl.getCurrentUser);
router.get('/:id', ctrl.getUserById);
router.get('/:id/tools', ctrl.getUserTools);

export default router;
