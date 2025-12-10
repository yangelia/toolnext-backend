import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool' },
    rating: Number,
    text: String,
  },
  { timestamps: true },
);

export const Feedback = model('Feedback', feedbackSchema);
