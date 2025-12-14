// import { Schema, model } from 'mongoose';

// const feedbackSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: 'User' },
//     toolId: { type: Schema.Types.ObjectId, ref: 'Tool' },
//     rating: Number,
//     text: String,
//   },
//   { timestamps: true },
// );

// export const Feedback = model('Feedback', feedbackSchema);

// src/models/feedback.js

import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
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
