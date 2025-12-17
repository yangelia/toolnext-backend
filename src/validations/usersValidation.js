import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// Кастомний валідатор для MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid user ID format')
    : value;
};

// Валідація для GET /users/:id
// Перевіряємо, що id є валідним MongoDB ObjectId

export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'User ID is required',
      'string.base': 'User ID must be a string',
    }),
  }),
};

// Валідація для GET /users/:id/tools
// Перевіряємо id та query параметри для пагінації

export const getUserToolsSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'User ID is required',
      'string.base': 'User ID must be a string',
    }),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100',
    }),
    sortBy: Joi.string()
      .valid('createdAt', 'pricePerDay', 'rating', 'name')
      .default('createdAt')
      .messages({
        'any.only':
          'SortBy must be one of: createdAt, pricePerDay, rating, name',
      }),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').messages({
      'any.only': 'SortOrder must be either asc or desc',
    }),
  }),
};
