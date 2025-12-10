import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    price: Number,
    rating: Number,
    images: [String],
    category: String,
  },
  { timestamps: true },
);

export const Tool = model('Tool', toolSchema);
