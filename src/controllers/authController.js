import createHttpError from 'http-errors';

import {
  registerUserService,
  loginUserService,
  refreshSessionService,
  logoutUserService,
  setSessionCookies,
} from '../services/auth.js';

// POST /auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, session } = await registerUserService(email, password);

    setSessionCookies(res, session);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, session } = await loginUserService(email, password);

    setSessionCookies(res, session);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// POST /auth/refresh
export const refreshUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Session not found');
    }

    const newSession = await refreshSessionService(sessionId, refreshToken);

    setSessionCookies(res, newSession);

    res.status(200).json({ message: 'Session refreshed' });
  } catch (err) {
    next(err);
  }
};

// POST /auth/logout
export const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    await logoutUserService(sessionId);

    const clearOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    res.clearCookie('accessToken', clearOptions);
    res.clearCookie('refreshToken', clearOptions);
    res.clearCookie('sessionId', clearOptions);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
