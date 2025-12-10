import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool' },
    dateFrom: Date,
    dateTo: Date,
  },
  { timestamps: true },
);

export const Booking = model('Booking', bookingSchema);
