import { Joi } from 'celebrate';

export const feedbackSchema = {
  create: {
    body: Joi.object().keys({
      toolId: Joi.string().hex().length(24).required().messages({
          'string.hex': 'Tool ID must be a valid hexadecimal string.',
          'string.length': 'Tool ID must be 24 characters long.',
          'any.required': 'Tool ID (toolId) is required.',
      }),

      name: Joi.string().min(2).max(50).required().messages({
          'string.min': 'Name must be at least 2 characters long.',
          'string.max': 'Name cannot exceed 50 characters.',
          'any.required': 'Name is required.',
      }),

      rate: Joi.number().integer().min(1).max(5).required().messages({
          'number.base': 'Rating must be a number.',
          'number.min': 'Rating must be at least 1.',
          'number.max': 'Rating cannot exceed 5.',
          'any.required': 'Rating is required.',
      }),

      description: Joi.string().min(3).max(500).required().messages({
          'string.min': 'Description must be at least 3 characters long.',
          'string.max': 'Description cannot exceed 500 characters.',
          'any.required': 'Description is required.',
      }),
    }),
  },

  delete: {
    params: Joi.object().keys({
      feedbackId: Joi.string().hex().length(24).required().messages({
          'string.hex': 'Feedback ID must be a valid hexadecimal string.',
          'string.length': 'Feedback ID must be 24 characters long.',
          'any.required': 'Feedback ID is required in URL.',
      }),
    }),
  },
  getTool: {
    params: Joi.object().keys({
      toolId: Joi.string().hex().length(24).required().messages({
          'string.hex': 'Tool ID must be a valid hexadecimal string.',
          'string.length': 'Tool ID must be 24 characters long.',
          'any.required': 'Tool ID is required in URL.',
      }),
    }),
  }
};
