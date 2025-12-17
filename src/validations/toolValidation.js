import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const toolIdParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

// Валідуємо об'єкт зі specifications
const specsObjectSchema = Joi.object()
  .pattern(
    Joi.string().min(1).max(50), //ключ
    Joi.alternatives().try(
      // значення
      Joi.string().min(1).max(200),
      Joi.number(),
      Joi.boolean(),
    ),
  )
  .max(10); // максимум пар ключ-значення

// Валідація у випадку, коли specifications приходить рядком з JSON
const jsonObjectValidator = (value, helpers) => {
  // перевірка типу
  if (typeof value !== 'string') return value;
  try {
    // розпарсимо і перевіримо структуру об'єкта
    const parsed = JSON.parse(value);
    const { error } = specsObjectSchema.validate(parsed);
    if (error) return helpers.message('Invalid specifications object');
    return value;
    // якщо JSON.parse впав
  } catch {
    return helpers.message('specifications must be valid JSON');
  }
};

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

export const updateToolSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96),
    pricePerDay: Joi.number().min(0),
    category: Joi.string().custom(objectIdValidator),
    description: Joi.string().min(20).max(2000),
    rentalTerms: Joi.string().min(20).max(1000),
    specifications: Joi.alternatives().try(
      specsObjectSchema,
      Joi.string().custom(jsonObjectValidator),
    ),
    // specifications: Joi.string().max(1000),
    // }).min(1),
  }),
};

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

export const toolIdSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),
};



