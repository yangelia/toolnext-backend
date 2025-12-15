import { Joi, Segments } from 'celebrate';
export const registerSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};


export const requestResetEmailSchema = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
    })
}



export const resetPasswordSchema = {
    [Segments.BODY]: Joi.object({
        password: Joi.string().min(8).required(),
    token: Joi.string().required(),
    })
}