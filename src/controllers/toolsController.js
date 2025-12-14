import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFromCloudinary } from '../utils/deleteFromCloudinary.js';

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

    // Boolean на поля та файл
    const hasBodyUpdates = Object.keys(updateData).length > 0;
    const hasFile = Boolean(req.file);
    // повертаємо інструмент той, який був, якщо змін не було
    if (!hasBodyUpdates && !hasFile) {
      const existingTool = await Tool.findOne({ _id: id, owner: req.user._id });
      if (!existingTool) return next(createHttpError(404, 'Tool not found'));
      return res.status(200).json(existingTool);
    }

    if (updateData.pricePerDay !== undefined) {
      updateData.pricePerDay = Number(updateData.pricePerDay);
    }

    // якщо specifications прийшло як multipart
    if (updateData.specifications !== undefined) {
      if (typeof updateData.specifications === 'string') {
        try {
          updateData.specifications = JSON.parse(updateData.specifications);
        } catch {
          return next(createHttpError(400, 'Invalid specifications JSON'));
        }
      }
    }

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.buffer);

      updateData.images = [result.secure_url];
      updateData.imagePublicIds = [result.public_id];
    }

    const tool = await Tool.findOneAndUpdate(
      // { _id: id },
      { _id: id, owner: req.user._id },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
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

export const deleteTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    // знаходжу tool
    const tool = await Tool.findById(id);
    if (!tool) return next(createHttpError(404, 'Tool not found'));

    // перевірка власник чи нє
    if (tool.owner.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, 'Forbidden'));
    }

    // видаляю фото з Cloudinary
    const publicIds = Array.isArray(tool.imagePublicIds)
      ? tool.imagePublicIds
      : [];

    if (publicIds.length > 0) {
      await Promise.all(publicIds.map((pid) => deleteFromCloudinary(pid)));
    }

    // видалення з БД
    await tool.deleteOne();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
