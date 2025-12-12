import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createToolSchema = {};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
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
    specifications: Joi.string().max(1000),
  }).min(1),
};
