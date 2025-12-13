import crypto from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { setSessionCookies } from '../services/auth.js';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(400, 'Email in use');
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо користувача
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Створюємо session
    const session = await Session.create({
      userId: newUser._id,
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      refreshTokenValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    setSessionCookies(res, session);

    return res.status(201).json({
      user: {
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
