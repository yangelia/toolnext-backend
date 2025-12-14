// src/validations/toolValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// -----------------------------
//        GET /tools
// -----------------------------

// Кастомний валідатор для рядка категорій
const categoriesValidator = (value, helpers) => {
  const ids = value.split(',');
  for (const id of ids) {
    if (!isValidObjectId(id)) {
      return helpers.message(`Invalid ObjectId: ${id}`);
    }
  }
  return value;
};

export const getAllToolsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
    category: Joi.string().custom(categoriesValidator).optional(),
    search: Joi.string().trim().allow(''),
  }),
};

function objectIdValidator(value, helpers) {
  return !isValidObjectId(value) ? helpers.message('Invalid Id format') : value;
}


export const toolIdSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),
};


// export const createToolSchema = {};
// export const updateToolSchema = {};
