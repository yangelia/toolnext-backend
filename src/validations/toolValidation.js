import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// -----------------------------
//        HELPERS
// -----------------------------

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
};

// Кастомний валідатор для рядка категорій (GET /tools?category=id1,id2)
const categoriesValidator = (value, helpers) => {
  const ids = value.split(',');
  for (const id of ids) {
    if (!isValidObjectId(id)) {
      return helpers.message(`Invalid ObjectId: ${id}`);
    }
  }
  return value;
};

// -----------------------------
//        GET /tools
// -----------------------------

export const getAllToolsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
    category: Joi.string().custom(categoriesValidator).optional(),
    search: Joi.string().trim().allow(''),
  }),
};

// -----------------------------
//        POST /tools
// -----------------------------

export const createToolSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    pricePerDay: Joi.number().positive().required(),
    category: Joi.string().custom(objectIdValidator).required(),

    description: Joi.string().allow(''),
    rentalTerms: Joi.string().allow(''),
    specifications: Joi.string().allow(''),
  }),
};

// -----------------------------
//        PUT /tools/:id
// -----------------------------

export const updateToolSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100),
    pricePerDay: Joi.number().positive(),
    category: Joi.string().custom(objectIdValidator),

    description: Joi.string().allow(''),
    rentalTerms: Joi.string().allow(''),
    specifications: Joi.string().allow(''),
  }).min(1),
};
