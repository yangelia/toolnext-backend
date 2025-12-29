import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Tool categories management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   keywords:
 *                     type: string
 */
router.get('/', getCategories);

export default router;
