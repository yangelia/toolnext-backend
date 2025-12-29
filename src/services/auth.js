import crypto from 'crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

export const createSession = async (userId) => {
  return Session.create({
    userId,
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const setSessionCookies = (res, session) => {
  const options = {
    httpOnly: true,
    secure: true, // ❗ ВСЕГДА true
    sameSite: 'none', // ❗ ВСЕГДА none для cross-domain
  };

  res.cookie('accessToken', session.accessToken, {
    ...options,
    expires: session.accessTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    ...options,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id.toString(), {
    ...options,
    expires: session.refreshTokenValidUntil,
  });
};
