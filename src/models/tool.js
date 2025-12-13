import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    pricePerDay: Number,
    rating: { type: Number, min: 0, max: 5, default: 0 },
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    rentalTerms: String,
    specifications: { type: Schema.Types.Mixed, default: {} },
    bookedDates: {
      type: [
        {
          start: { type: Date, required: true },
          end: { type: Date, required: true },
        },
      ],
      default: [],
    },
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  },
  { timestamps: true },
);

export const Tool = model('Tool', toolSchema);
