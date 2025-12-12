import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    keywords: { type: String },
  },
  { timestamps: true },
);

export const Category = model('Category', categorySchema);
