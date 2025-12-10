import { Router } from 'express';
import * as ctrl from '../controllers/authController.js';

const router = Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/current', ctrl.getCurrent);
router.post('/refresh', ctrl.refresh);

export default router;
