// src/models/tool.js

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
      trim: true,
      default: '',
    },
    price: Number,
    rating: Number,
    images: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// toolSchema.index(
//   { title: 'text', description: 'text' },
//   {
//     name: 'ToolTextIndex',
//     weights: { name: 5, description: 1 },
//     default_language: 'english',
//   },
// );

export const Tool = model('Tool', toolSchema);

// import { Schema, model } from 'mongoose';

// const toolSchema = new Schema(
//   {
//     owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, required: true },
//     description: String,
//     price: Number,
//     rating: Number,
//     images: [String],
//     category: String,
//   },
//   { timestamps: true },
// );

// export const Tool = model('Tool', toolSchema);
