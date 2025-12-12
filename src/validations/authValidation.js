import { Joi, Segments } from 'celebrate';
export const registerSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
export const loginSchema = {};
