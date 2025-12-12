import { Category } from '../models/category.js';

export const getAllCategories = async () => {
  return Category.find();
};
