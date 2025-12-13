import { Joi, Segments } from 'celebrate';

export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'User ID must be a valid hex string',
      'string.length': 'User ID must be 24 characters long',
      'any.required': 'User ID is required',
    }),
  }),
};

export const getUserToolsSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'User ID must be a valid hex string',
      'string.length': 'User ID must be 24 characters long',
      'any.required': 'User ID is required',
    }),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string()
      .valid('createdAt', 'pricePerDay', 'rating', 'name')
      .default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  }),
};
