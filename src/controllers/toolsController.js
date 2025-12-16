import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';

/**
 * POST /tools
 * Створення нового інструменту
 */
export const createTool = async (req, res, next) => {
  try {
    const {
      name,
      pricePerDay,
      category,
      description = '',
      rentalTerms = '',
      specifications = '',
    } = req.body;

    if (!name || !pricePerDay || !category) {
      throw createHttpError(400, 'Missing required fields');
    }

    const owner = req.user._id;

    // Завантажені зображення
    const images = Array.isArray(req.files)
      ? req.files.map((file) => `/uploads/tools/${file.filename}`)
      : [];

    // textarea → Map
    const parsedSpecifications = {};
    specifications
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const [key, value] = line.split(':');
        if (key && value) {
          parsedSpecifications[key.trim()] = value.trim();
        }
      });

    const tool = await Tool.create({
      name,
      pricePerDay: Number(pricePerDay),
      category,
      description,
      rentalTerms,
      specifications: parsedSpecifications,
      images,
      owner,
    });

    res.status(201).json(tool);
  } catch (error) {
    next(error);
  }
};
