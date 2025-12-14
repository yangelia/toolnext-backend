// src/models/tool.js

import { Schema, model } from 'mongoose';

// перевіряємо чи end йде за start по даті
const bookedRangeSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return this.start && v > this.start;
        },
        message: 'end must be greater than start',
      },
    },
  },
  { _id: false },
);

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
      min: 0,
      max: 5,
      default: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    // для id з Cloudinary (for Delete)
    imagePublicIds: {
      type: [String],
      default: [],
    },

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    // specifications: { type: Schema.Types.Mixed, default: {} },

    rentalTerms: {
      type: String,
      default: '',
    },
    bookedDates: {

      type: [bookedRangeSchema],

      default: [],
    },
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

    default_language: 'none',

  },
);

export const Tool = model('Tool', toolSchema);
