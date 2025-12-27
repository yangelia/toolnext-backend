import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    avatarUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.name) {
    this.name = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
