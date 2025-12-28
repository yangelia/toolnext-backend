import { Tool } from '../models/tool.js';
import createHttpError from 'http-errors';

/* ---------- GET /api/tools ---------- */
export const getAllTools = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = req.query;

    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);
    const skip = (pageNumber - 1) * perPageNumber;

    const [tools, total] = await Promise.all([
      Tool.find().skip(skip).limit(perPageNumber),
      Tool.countDocuments(),
    ]);

    res.json({
      tools,
      page: pageNumber,
      perPage: perPageNumber,
      total,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- POST /api/tools ---------- */
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

    if (!name || category === undefined || pricePerDay === undefined) {
      throw createHttpError(400, 'Missing required fields');
    }

    const owner = req.user._id;

    const images = Array.isArray(req.files)
      ? req.files.map((file) => `/uploads/tools/${file.filename}`)
      : [];

    const parsedSpecifications = {};
    specifications
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .forEach((line) => {
        const [key, ...rest] = line.split(':');
        const value = rest.join(':');
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
