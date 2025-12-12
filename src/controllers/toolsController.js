import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getTools = async (req, res, next) => {};
export const getToolById = async (req, res, next) => {};
export const createTool = async (req, res, next) => {};

export const updateTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Дозволені поля
    const allowedFields = [
      'name',
      'pricePerDay',
      'category',
      'description',
      'rentalTerms',
      'specifications',
    ];

    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }

    if (updateData.pricePerDay !== undefined) {
      updateData.pricePerDay = Number(updateData.pricePerDay);
    }

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.buffer);
      updateData.images = [result.secure_url];
    }

    const tool = await Tool.findOneAndUpdate(
      { _id: id },
      // { _id: id, owner: req.user._id },
      // req.body,
      { $set: updateData },
      {
        new: true,
      },
    );
    if (!tool) {
      next(createHttpError(404, 'Tool not found'));
      return;
    }
    res.status(200).json(tool);
  } catch (error) {
    next(error);
  }
};

export const deleteTool = async (req, res, next) => {};
