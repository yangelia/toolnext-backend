import Joi from "joi";


export const bookingSchema = Joi.object({
  toolId: Joi.string().required().messages({
    "string.empty": "toolId is required",
    "any.required": "toolId is required",
  }),

  firstName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name must be at most 50 characters",
  }),

  lastName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name must be at most 50 characters",
  }),

  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone format",
      "string.empty": "Phone is required",
    }),

  startDate: Joi.date().iso().min(new Date()).required().messages({
     "date.min": "Start date cannot be in the past",
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),

  endDate: Joi.date().iso().min(Joi.ref("startDate")).required().messages({
    "date.base": "End date must be a valid date",
    "date.min": "End date must be after start date",
    "any.required": "End date is required",
  }),
  deliveryCity: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Delivery city is required",
    "string.min": "Delivery city must be at least 2 characters",
    "string.max": "Delivery city must be at most 100 characters",
  }),

  deliveryBranch: Joi.string().min(1).max(200).required().messages({
    "string.empty": "Delivery branch is required",
    "string.min": "Delivery branch must be at least 1 character",
    "string.max": "Delivery branch must be at most 200 characters",
  }),
});
