import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';

export const getTools = async (req, res, next) => {};
export const getToolById = async (req, res, next) => {};
export const createTool = async (req, res, next) => {};

export const updateTool = async (req, res, next) => {
  const { id } = req.params;
  const tool = await Tool.findOneAndUpdate(
    // { _id: id, owner: req.user._id },
    { _id: id },
    req.body,
    {
      new: true,
    },
  );
  if (!tool) {
    next(createHttpError(404, 'Tool not found'));
    return;
  }
  res.status(200).json(tool);
};

export const deleteTool = async (req, res, next) => {};
