import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email in use'));
  }
  // Хешуємо пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створюємо користувача
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });
  setSessionCookies(res, newSession);

  res.status(201).json({});
};
export const login = async (req, res, next) => {};
export const logout = async (req, res, next) => {};
export const getCurrent = async (req, res, next) => {};
export const refresh = async (req, res, next) => {};
