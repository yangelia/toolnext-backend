import Booking from "../models/booking.js";

export const createBooking = async (req, res, next) => { };

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
};


