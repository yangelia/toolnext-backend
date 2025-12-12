import createHttpError from "http-errors";
import { Booking } from "../models/booking.js";
import { Tool } from "../models/tool.js";

const getBookingsForTool = async (toolId) => {
  return Booking.find({ toolId }).select("startDate endDate -_id").sort({ startDate: 1 });
};
const findFreeSlots = (bookings) => {
  const free = [];
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);

  if (!bookings.length) {
    // Якщо немає бронювань, весь період від сьогодні вільний
    free.push({ from: today, to: null });
    return free;
  }

  // Сортуємо бронювання по даті початку
  const sorted = bookings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // 1️⃣ Вільний проміжок від сьогодні до першого бронювання
  const firstStart = new Date(sorted[0].startDate);
  if (firstStart > today) {
    free.push({ from: today, to: new Date(firstStart.getTime() - 86400000) });
  }

  // 2️⃣ Вільні проміжки між бронюваннями
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = new Date(sorted[i].endDate);
    const nextStart = new Date(sorted[i + 1].startDate);

    if ((nextStart - currentEnd) / 86400000 > 1) {
      free.push({
        from: new Date(currentEnd.getTime() + 86400000),
        to: new Date(nextStart.getTime() - 86400000),
      });
    }
  }

  // 3️⃣ Вільний проміжок після останнього бронювання
  const lastEnd = new Date(sorted[sorted.length - 1].endDate);
  free.push({ from: new Date(lastEnd.getTime() + 86400000), to: null }); // null = без кінця

  return free;
};

 export const getBookedDates = async (toolId) => {
  const bookings = await Booking.find({ toolId })
    .select("startDate endDate -_id")
    .sort({ startDate: 1 });

  const freeSlots = findFreeSlots(bookings);

  return { bookedDates: bookings, freeSlots };
};




export const createBooking = async (userId, toolId, data) => {
  const {
    startDate,
    endDate,
    firstName,
    lastName,
    phone,
    deliveryCity,
    deliveryBranch,
  } = data;

  if (new Date(startDate) >= new Date(endDate)) throw createHttpError(400, 'Start date must be before end date');
  if (new Date(startDate) < new Date(Date.now())) throw createHttpError(400, 'Start date cannot be in the past');

  const tool = await Tool.findById(toolId);
  if (!tool) {
    const error = new Error("Tool not found");
    error.status = 404;
    throw error;
  }

  // 2. Перевірка перетину дат
  // отримуємо всі бронювання інструменту
  const bookings = await getBookingsForTool(toolId);

  // перевіряємо, чи є перетин
  const overlap = bookings.find(b =>
    new Date(b.startDate) <= new Date(endDate) &&
    new Date(b.endDate) >= new Date(startDate)
  );

 if (overlap) {
    return {
      status: 409,
      message: "Selected dates are not available",
      bookedDates: bookings,
      freeSlots: findFreeSlots(bookings),
    };
}


  const booking = await Booking.create({
    userId,
    toolId,
    firstName,
    lastName,
    phone,
    deliveryCity,
    deliveryBranch,
    startDate,
    endDate,

  });

  return booking;
};

