import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

import { ApiError, API_ERROR_CODES } from '../constants/api-error-codes.js';

// Sign a short-lived access token.
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

// Sign a long-lived refresh token.
export const generateRefreshToken = (payload) => {
  const tokenPayload = {
    ...payload,
    // Ensure refresh tokens are unique even when issued in the same second.
    jti: crypto.randomUUID(),
  };

  return jwt.sign(tokenPayload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

// Verify access token and translate errors into ApiError.
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token,  process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(API_ERROR_CODES.TOKEN_EXPIRED, 'Access token expired', 401);
    }
    throw new ApiError(API_ERROR_CODES.INVALID_TOKEN, 'Invalid access token', 401);
  }
};

// Verify refresh token and translate errors into ApiError.
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(API_ERROR_CODES.REFRESH_TOKEN_EXPIRED, 'Refresh token expired', 401);
    }
    throw new ApiError(API_ERROR_CODES.REFRESH_TOKEN_INVALID, 'Invalid refresh token', 401);
  }
};
