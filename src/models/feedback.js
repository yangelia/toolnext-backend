// src/models/feedback.js

import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    toolId: {
      type: Schema.Types.ObjectId,
      ref: 'Tool',
      required: false,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Feedback = model('Feedback', feedbackSchema);
