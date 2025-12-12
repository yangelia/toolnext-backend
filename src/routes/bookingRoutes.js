import { Router } from 'express';
import * as ctrl from '../controllers/bookingController.js';
import auth from '../middleware/authenticate.js';
import validateAccess from '../middleware/validateAccess.js';

const router = Router();

router.post('/:toolId', ctrl.createBooking);
router.get('/my', ctrl.getMyBookings);

// GET /bookings/:bookingId отримання конкретного бронювання (підтвердження)
router.get("/:bookingId", auth, validateAccess, bookingsController.getBooking);

export default router;



