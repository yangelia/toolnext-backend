import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';

/**
 * GET /tools
 * Отримання списку інструментів з пагінацією, фільтрацією та пошуком
 */
export const getTools = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, category, search } = req.query;
    const skip = (page - 1) * perPage;

    const toolsQuery = Tool.find().populate('category', 'title');

    // Фільтрація за категоріями
    if (category) {
      const categories = category
        .split(',')
        .map((id) => new mongoose.Types.ObjectId(id));

      toolsQuery.where('category').in(categories);
    }

    // Текстовий пошук (name + description)
    if (search) {
      toolsQuery.where({
        $text: { $search: search },
      });
    }

    const [totalTools, tools] = await Promise.all([
      toolsQuery.clone().countDocuments(),
      toolsQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalTools / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalTools,
      totalPages,
      tools,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /tools/:id
 * (реалізує інший учасник)
 */
export const getToolById = async (req, res, next) => {
  next(createHttpError(501, 'Not implemented'));
};

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
    const images = req.files?.map((file) => `/uploads/tools/${file.filename}`) || [];

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
      pricePerDay,
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

/**
 * PUT /tools/:id
 * Редагування інструменту (тільки власник)
 */
export const updateTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      throw createHttpError(404, 'Tool not found');
    }

    // Перевірка власника
    if (tool.owner.toString() !== req.user._id.toString()) {
      throw createHttpError(403, 'Access denied');
    }

    const updates = { ...req.body };

    // Нові зображення (якщо є)
    if (req.files?.length) {
      updates.images = req.files.map(
        (file) => `/uploads/tools/${file.filename}`
      );
    }

    // specifications textarea → Map
    if (updates.specifications) {
      const parsedSpecifications = {};
      updates.specifications
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => {
          const [key, value] = line.split(':');
          if (key && value) {
            parsedSpecifications[key.trim()] = value.trim();
          }
        });

      updates.specifications = parsedSpecifications;
    }

    const updatedTool = await Tool.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json(updatedTool);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /tools/:id
 * Видалення інструменту (тільки власник)
 */
export const deleteTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) {
      throw createHttpError(404, 'Tool not found');
    }

    if (tool.owner.toString() !== req.user._id.toString()) {
      throw createHttpError(403, 'Access denied');
    }

    await Tool.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
