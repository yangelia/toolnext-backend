// src/controllers/toolsController.js

import mongoose from 'mongoose';

import { Tool } from '../models/tool.js';
import { Feedback } from '../models/feedback.js';

export const getTools = async (req, res, next) => {
  try {
    // Параметри запиту
    const { page = 1, perPage = 10, category, search } = req.query;
    const skip = (page - 1) * perPage;

    const toolsQuery = Tool.find().populate('category').populate('feedbacks');

    // Фільтрація за категоріями
    if (category) {
      const categories = category
        .split(',')
        .map((id) => mongoose.Types.ObjectId(id));

      toolsQuery.where('category').in(categories);
    }

    // Текстовий пошук по name + description
    if (search) {
      toolsQuery.where({
        $text: { $search: search },
      });
    }

    // Пагінація
    const [totalTools, tools] = await Promise.all([
      toolsQuery.clone().countDocuments(),
      toolsQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalTools / perPage);

    res.status(200).json({
      page,
      perPage,
      totalTools,
      totalPages,
      tools,
    });
  } catch (err) {
    next(err);
  }
};

export const getToolById = async (req, res, next) => {};
export const createTool = async (req, res, next) => {};
export const updateTool = async (req, res, next) => {};
export const deleteTool = async (req, res, next) => {};
