import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

export const Session = model('Session', sessionSchema);
