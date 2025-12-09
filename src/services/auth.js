import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  const now = Date.now();

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(now + ONE_DAY),
  };
};

export const createSession = async (userId) => {
  const {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  } = generateTokens(userId);

  const session = await Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return session;
};

export const setSessionCookies = (res, session) => {
  const baseOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  res.cookie('accessToken', session.accessToken, {
    ...baseOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...baseOptions,
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...baseOptions,
    maxAge: ONE_DAY,
  });
};

// ---------- register ----------
export const registerUserService = async (email, password) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const session = await createSession(user._id);

  return { user, session };
};

// ---------- login ----------
export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // delete old sessions
  await Session.deleteMany({ userId: user._id });

  const session = await createSession(user._id);

  return { user, session };
};

// refresh
export const refreshSessionService = async (
  sessionId,
  refreshTokenFromCookie,
) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: refreshTokenFromCookie,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  // check if refresh token is valid
  try {
    jwt.verify(refreshTokenFromCookie, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Session token expired');
  }

  // delete old session
  await Session.deleteOne({ _id: session._id });

  // new session
  const newSession = await createSession(session.userId);

  return newSession;
};

// logout
export const logoutUserService = async (sessionId) => {
  if (!sessionId) return;

  await Session.deleteOne({ _id: sessionId });
};
