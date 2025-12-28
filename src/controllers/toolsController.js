import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFromCloudinary } from '../utils/deleteFromCloudinary.js';
import mongoose from 'mongoose';

/* ---------- GET /api/tools ---------- */
export const getAllTools = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, category, search } = req.query;
    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);
    const skip = (pageNumber - 1) * perPageNumber;

    const toolsQuery = Tool.find()
      .populate('category')
      .populate('feedbacks')
      .populate({
        path: 'owner',
        select: '_id username avatar name avatarUrl',
      });

    if (category) {
      const categories = category
        .split(',')
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));

      if (categories.length) {
        toolsQuery.where('category').in(categories);
      }
    }

    if (search) {
      toolsQuery.where({ $text: { $search: search } });
    }

    const [total, tools] = await Promise.all([
      toolsQuery.clone().countDocuments(),
      toolsQuery.skip(skip).limit(perPageNumber),
    ]);

    res.status(200).json({
      tools,
      page: pageNumber,
      perPage: perPageNumber,
      total,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- GET /api/tools/:toolId ---------- */
export const getToolById = async (req, res, next) => {
  try {
    const { toolId } = req.params;

    const tool = await Tool.findById(toolId)
      .populate('category')
      .populate('feedbacks')
      .populate({
        path: 'owner',
        select: '_id username avatar name avatarUrl',
      });

    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }

    res.status(200).json(tool);
  } catch (error) {
    next(error);
  }
};

/* ---------- helpers ---------- */
const normalizeSpecifications = (specifications) => {
  if (specifications === undefined) return undefined;

  let obj = specifications;

  if (typeof obj === 'string') {
    if (!obj.trim()) return {};
    try {
      obj = JSON.parse(obj);
    } catch {
      throw createHttpError(400, 'Invalid specifications JSON');
    }
  }

  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    throw createHttpError(400, 'Invalid specifications format');
  }

  const normalized = {};
  for (const [k, v] of Object.entries(obj)) {
    normalized[k] = String(v);
  }
  return normalized;
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
      specifications = {},
    } = req.body;

    if (!name || !category || pricePerDay === undefined) {
      return next(createHttpError(400, 'Missing required fields'));
    }

    const owner = req.user?._id;
    if (!owner) return next(createHttpError(401, 'Unauthorized'));

    const normalizedSpecs = normalizeSpecifications(specifications) ?? {};

    const images = [];
    const imagePublicIds = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const result = await saveFileToCloudinary(file.buffer);
        images.push(result.secure_url);
        imagePublicIds.push(result.public_id);
      }
    }

    const tool = await Tool.create({
      name,
      pricePerDay: Number(pricePerDay),
      category,
      description,
      rentalTerms,
      specifications: normalizedSpecs,
      images,
      imagePublicIds,
      owner,
    });

    res.status(201).json(tool);
  } catch (error) {
    next(error);
  }
};

/* ---------- PATCH /api/tools/:id ---------- */
export const updateTool = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    if (updateData.specifications !== undefined) {
      updateData.specifications = normalizeSpecifications(
        updateData.specifications,
      );
    }

    if (req.files?.length) {
      const images = [];
      const imagePublicIds = [];

      for (const file of req.files) {
        const result = await saveFileToCloudinary(file.buffer);
        images.push(result.secure_url);
        imagePublicIds.push(result.public_id);
      }

      updateData.images = images;
      updateData.imagePublicIds = imagePublicIds;
    }

    const tool = await Tool.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }

    res.status(200).json(tool);
  } catch (error) {
    next(error);
  }
};

/* ---------- DELETE /api/tools/:id ---------- */
export const deleteTool = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findById(id);
    if (!tool) return next(createHttpError(404, 'Tool not found'));

    if (tool.owner.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, 'Forbidden'));
    }

    if (Array.isArray(tool.imagePublicIds)) {
      await Promise.all(
        tool.imagePublicIds.map((pid) => deleteFromCloudinary(pid)),
      );
    }

    await tool.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
