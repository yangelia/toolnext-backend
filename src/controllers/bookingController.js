import { createBooking } from "../services/booking.js";

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


