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
    images: [
      {
        type: String,
      },
    ],
    specifications: {
      type: Schema.Types.Mixed, // дозволяє "Тиск", "Потужність", "Двигун" і будь-які інші ключі
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

export default model('Tool', toolSchema);

// toolSchema.index(
//   { title: 'text', description: 'text' },
//   {
//     name: 'ToolTextIndex',
//     weights: { name: 5, description: 1 },
//     default_language: 'english',
//   },
// );

export const Tool = model('Tool', toolSchema);

// src/server.js

import { Student } from './models/student.js';
// Код імпортів та підключення middleware бібліотек

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

// Код 404 та error middleware, підключення до бази даних та старт сервера
