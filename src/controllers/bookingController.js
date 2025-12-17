
import Booking from "../models/booking.js";
import { createBooking } from "../services/booking.js";

// Отримання бронювань користувача
export const getMyBookings = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking
            .find({ userId })
            .populate("toolId")
            .sort({ createdAt: -1 });

        return res.json({
            message: "My bookings retrieved successfully",
            bookings,
        });
    } catch (error) {
        next(error);
    }

export const createBookingController = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { toolId } = req.params;

    const booking = await createBooking(userId, toolId, req.body);

     if (booking.status === 409) {
      return res.status(booking.status).json(booking);
    }

    res.status(201).json({
      status: 201,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


