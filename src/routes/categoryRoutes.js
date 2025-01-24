const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               taxType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories/{idOrName}:
 *   get:
 *     summary: Get a category by ID or name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idOrName
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID or name
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/:idOrName', categoryController.getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *               taxType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', categoryController.updateCategory);

module.exports = router;