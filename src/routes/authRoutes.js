import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as ctrl from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerSchema), ctrl.register);
router.post('/login', celebrate(loginSchema), ctrl.login);
router.post('/refresh', ctrl.refresh);
router.post('/logout', ctrl.logout);

export default router;
