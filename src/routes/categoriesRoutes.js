import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

const router = Router();

router.get('/', getCategories);

export default router;
