import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as ctrl from '../controllers/authController.js';
import { loginSchema, registerSchema, requestResetEmailSchema, resetPasswordSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerSchema), ctrl.register);
router.post('/login', celebrate(loginSchema), ctrl.login);
router.post('/logout', ctrl.logout);
// router.get('/current', ctrl.getCurrent);
router.post('/refresh', ctrl.refresh);

router.post("/reset-email", celebrate(requestResetEmailSchema), ctrl.requestResetEmail);
router.post("/reset-password", celebrate(resetPasswordSchema), ctrl.resetPassword);

export default router;
