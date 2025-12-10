import { Router } from 'express';
import * as ctrl from '../controllers/bookingController.js';

const router = Router();

router.post('/:toolId', ctrl.createBooking);
router.get('/my', ctrl.getMyBookings);

export default router;
