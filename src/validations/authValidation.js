import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    name: Joi.string().min(2).max(32).required().messages({
      // ← ЗМІНЕНО: username → name
      'any.required': 'Name is required',
    }),
    password: Joi.string().min(8).max(128).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.required': 'Confirm password is required',
        'any.only': 'Passwords must match',
      }),
  }),
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
  }),
};
