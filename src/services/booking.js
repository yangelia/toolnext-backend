import createHttpError from "http-errors";
import { Booking } from "../models/booking.js";
import { Tool } from "../models/tool.js";

const getBookingsForTool = async (toolId) => {
  return Booking.find({ toolId }).select("startDate endDate -_id").sort({ startDate: 1 });
};

function toUTCDay(date) {
  const d = new Date(date);
  return new Date(Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate()
  ));
}

const findFreeSlots = (bookings) => {
  const free = [];
const today = toUTCDay(new Date(Date.now() + 86400000));
  today.setHours(0, 0, 0, 0);

  if (!bookings.length) {
    // Якщо немає бронювань, весь період від сьогодні вільний
    free.push({ from: today, to: null });
    return free;
  }

  // Сортуємо бронювання по даті початку
  const sorted = bookings
  .map(b => ({
    startDate: new Date(b.startDate).getTime(),
    endDate: new Date(b.endDate).getTime()
  }))
    .sort((a, b) => a.startDate - b.startDate);

  // 1️⃣ Вільний проміжок від сьогодні до першого бронювання
  const firstStart = new Date(sorted[0].startDate);
  if (firstStart > today) {
  const to = new Date(firstStart.getTime() - 86400000);
  if (today <= to) {
    free.push({ from: today, to });
  }
}
  // 2️⃣ Вільні проміжки між бронюваннями
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = new Date(sorted[i].endDate);
    const nextStart = new Date(sorted[i + 1].startDate);

    if ((nextStart - currentEnd)) {
      free.push({
        from: new Date(currentEnd.getTime()),
        to: new Date(nextStart.getTime()),
      });
    }
  }

  // 3️⃣ Вільний проміжок після останнього бронювання
  const lastEnd = new Date(sorted[sorted.length - 1].endDate);
  free.push({ from: new Date(lastEnd.getTime() + 86400000), to: null }); // null = без кінця

  return free;
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

  if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) throw createHttpError(400, 'Invalid date format');
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
    new Date(b.startDate) < new Date(endDate) &&
    new Date(b.endDate) > new Date(startDate)
  );
console.log("test", overlap);

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

