const express = require('express');
const itemsController = require('../controllers/itemController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               taxApplicable:
 *                 type: boolean
 *               tax:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', itemsController.createItem);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
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
 *         description: Items fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', itemsController.getAllItems);

/**
 * @swagger
 * /api/items/category/{categoryId}:
 *   get:
 *     summary: Get items by category ID
 *     tags: [Items]
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
 *         description: Items fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/category/:categoryId', itemsController.getItemsByCategoryId);

/**
 * @swagger
 * /api/items/subcategory/{subCategoryId}:
 *   get:
 *     summary: Get items by subcategory ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: SubCategory ID
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
 *         description: Items fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/subcategory/:subCategoryId', itemsController.getItemsBySubCategoryId);

/**
 * @swagger
 * /api/items/{idOrName}:
 *   get:
 *     summary: Get an item by ID or name
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: idOrName
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID or name
 *     responses:
 *       200:
 *         description: Item fetched successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:idOrName', itemsController.getItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               baseAmount:
 *                 type: number
 *               discount:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               taxApplicable:
 *                 type: boolean
 *               tax:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', itemsController.updateItem);

/**
 * @swagger
 * /api/items/search/{name}:
 *   get:
 *     summary: Search items by name
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Item name
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
 *         description: Items fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/search/:name', itemsController.searchItemsByName);

module.exports = router;