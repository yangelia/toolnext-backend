import { Router } from 'express';
// import { authenticate } from '../middleware/authenticate.js';
import * as ctrl from '../controllers/bookingController.js';



const router = Router();

router.post("/:toolId",   ctrl.createBookingController); // створення бронювання

export default router;
