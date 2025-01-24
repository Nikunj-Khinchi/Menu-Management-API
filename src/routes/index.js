const express = require('express');
const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const itemsRoutes = require('./itemsRoutes');

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/items', itemsRoutes);

module.exports = router;