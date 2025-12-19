import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import * as ctrl from '../controllers/bookingController.js';
import validateAccess from '../middleware/validateAccess.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Tool booking management
 */

/**
 * @swagger
 * /bookings/{toolId}:
 *   post:
 *     summary: Create booking for a tool
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 example: 2025-02-20
 *               endDate:
 *                 type: string
 *                 example: 2025-02-22
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/:toolId', authenticate, ctrl.createBookingController);

// GET /bookings/:bookingId отримання конкретного бронювання (підтвердження)
router.get('/:bookingId', authenticate, validateAccess, ctrl.getBooking);

export default router;
