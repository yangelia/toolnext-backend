import { Router } from 'express';
import { celebrate } from 'celebrate';
import { register } from '../controllers/authController.js';
import { registerSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerSchema), register);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/current', ctrl.getCurrent);
router.post('/refresh', ctrl.refresh);

export default router;
