const categoryService = require('../services/categoryService');
const logger = require('../utils/logger');
const WriteResponse = require('../utils/response');
const mongoose = require('mongoose');

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        logger.info('Category created successfully');
        return WriteResponse(res, 201, 'Category created successfully', category);
    } catch (error) {
        logger.error(`Error creating category: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const categories = await categoryService.getAllCategories(page, limit);
        logger.info('Categories fetched successfully');
        return WriteResponse(res, 200, 'Categories fetched successfully', categories);
    } catch (error) {
        logger.error(`Error fetching categories: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getCategory = async (req, res) => {
    try {
        const { idOrName } = req.params;
        let category;

        if (mongoose.Types.ObjectId.isValid(idOrName)) {
            category = await categoryService.getCategoryById(idOrName);
        } else {
            category = await categoryService.getCategoryByName(idOrName);
        }

        if (!category) {
            throw { status: 404, message: 'Category not found' };
        }

        logger.info('Category fetched successfully');
        return WriteResponse(res, 200, 'Category fetched successfully', category);
    } catch (error) {
        logger.error(`Error fetching category: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        logger.info('Category updated successfully');
        return WriteResponse(res, 200, 'Category updated successfully', updatedCategory);
    } catch (error) {
        logger.error(`Error updating category: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
};