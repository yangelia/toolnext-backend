import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    pricePerDay: Number,
    rating: Number,
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    rentalTerms: String,
    specifications: String,
  },
  { timestamps: true },
);

export const Tool = model('Tool', toolSchema);
