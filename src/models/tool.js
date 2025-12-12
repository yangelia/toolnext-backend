// src/models/Tool.js

import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    rentalTerms: {
      type: String,
      default: '',
    },
    bookedDates: [
      {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
    ],
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

toolSchema.index(
  { name: 'text', description: 'text' },
  {
    name: 'ToolTextIndex',
    weights: { name: 5, description: 1 },
    default_language: 'english',
  },
);

export const Tool = model('Tool', toolSchema);
