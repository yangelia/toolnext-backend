// src/validations/toolValidation.js

import { Joi, Segments } from 'celebrate';

import { TAGS } from '../constants/tags.js';

// -----------------------------
//        GET /tools
// -----------------------------

// export const getAllToolsSchema = {
//   [Segments.QUERY]: Joi.object({
//     page: Joi.number().integer().min(1).default(1),
//     perPage: Joi.number().integer().min(5).max(20).default(10),
//     tag: Joi.string()
//       .valid(...TAGS)
//       .optional(),
//     search: Joi.string().trim().allow(''),
//   }),
// };

// export const createToolSchema = {};
// export const updateToolSchema = {};
