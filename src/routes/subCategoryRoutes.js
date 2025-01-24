const express = require('express');
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategory management
 */

/**
 * @swagger
 * /api/subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
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
 *               categoryId:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', subCategoryController.createSubCategory);

/**
 * @swagger
 * /api/subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
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
 *         description: SubCategories fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', subCategoryController.getAllSubCategories);

/**
 * @swagger
 * /api/subcategories/category/{categoryId}:
 *   get:
 *     summary: Get subcategories by category ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
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
 *         description: SubCategories fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/category/:categoryId', subCategoryController.getSubCategoriesByCategoryId);

/**
 * @swagger
 * /api/subcategories/{idOrName}:
 *   get:
 *     summary: Get a subcategory by ID or name
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: idOrName
 *         schema:
 *           type: string
 *         required: true
 *         description: SubCategory ID or name
 *     responses:
 *       200:
 *         description: SubCategory fetched successfully
 *       404:
 *         description: SubCategory not found
 *       500:
 *         description: Internal server error
 */
router.get('/:idOrName', subCategoryController.getSubCategory);

/**
 * @swagger
 * /api/subcategories/{id}:
 *   put:
 *     summary: Update a subcategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SubCategory ID
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
 *               categoryId:
 *                 type: string
 *               taxApplicability:
 *                 type: boolean
 *               tax:
 *                 type: number
 *     responses:
 *       200:
 *         description: SubCategory updated successfully
 *       404:
 *         description: SubCategory not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', subCategoryController.updateSubCategory);

module.exports = router;