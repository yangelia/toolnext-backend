import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    name: String,
    description: String,
    rate: Number,
  },
  {
    timestamps: true,
    versionKey:false,
  },
);

export const Feedback = model('Feedback', feedbackSchema);
