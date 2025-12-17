import Booking from "../models/booking.js";
//
export default async function validateAccess(req, res, next) {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId).populate("toolId");

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const isBookingOwner = booking.userId.toString() === req.user.id;
    const isToolOwner = booking.toolId.ownerId.toString() === req.user.id;

    if (!isBookingOwner && !isToolOwner) {
        return res.status(403).json({ message: "Forbidden" });
    }

    req.booking = booking;

    next();
}
