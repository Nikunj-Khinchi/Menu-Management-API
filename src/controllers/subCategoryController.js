const subCategoryService = require('../services/subCategoryService');
const logger = require('../utils/logger');
const WriteResponse = require('../utils/response');
const mongoose = require('mongoose');

const createSubCategory = async (req, res) => {
    try {
        const subCategory = await subCategoryService.createSubCategory(req.body);
        logger.info('SubCategory created successfully');
        return WriteResponse(res, 201, 'SubCategory created successfully', subCategory);
    } catch (error) {
        logger.error(`Error creating subCategory: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getAllSubCategories = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const subCategories = await subCategoryService.getAllSubCategories(page, limit);
        logger.info('SubCategories fetched successfully');
        return WriteResponse(res, 200, 'SubCategories fetched successfully', subCategories);
    } catch (error) {
        logger.error(`Error fetching subCategories: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const subCategories = await subCategoryService.getSubCategoriesByCategoryId(req.params.categoryId, page, limit);
        logger.info('SubCategories fetched successfully');
        return WriteResponse(res, 200, 'SubCategories fetched successfully', subCategories);
    } catch (error) {
        logger.error(`Error fetching subCategories: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getSubCategory = async (req, res) => {
    try {
        const { idOrName } = req.params;
        let subCategory;

        if (mongoose.Types.ObjectId.isValid(idOrName)) {
            subCategory = await subCategoryService.getSubCategoryById(idOrName);
        } else {
            subCategory = await subCategoryService.getSubCategoryByName(idOrName);
        }

        if (!subCategory) {
            throw { status: 404, message: 'SubCategory not found' };
        }

        logger.info('SubCategory fetched successfully');
        return WriteResponse(res, 200, 'SubCategory fetched successfully', subCategory);
    } catch (error) {
        logger.error(`Error fetching subCategory: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await subCategoryService.updateSubCategory(req.params.id, req.body);
        logger.info('SubCategory updated successfully');
        return WriteResponse(res, 200, 'SubCategory updated successfully', updatedSubCategory);
    } catch (error) {
        logger.error(`Error updating subCategory: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoriesByCategoryId,
    getSubCategory,
    updateSubCategory,
};