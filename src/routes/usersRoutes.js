import { Router } from 'express';
import { celebrate } from 'celebrate';
import * as ctrl from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserByIdSchema,
  getUserToolsSchema,
} from '../validations/usersValidation.js';

const router = Router();

// Приватний ендпоінт - потребує аутентифікації

router.get('/current', authenticate, ctrl.getCurrentUser);

// Публічні ендпоінти - не потребують аутентифікації

router.get('/:id', celebrate(getUserByIdSchema), ctrl.getUserById);
router.get('/:id/tools', celebrate(getUserToolsSchema), ctrl.getUserTools);

export default router;
