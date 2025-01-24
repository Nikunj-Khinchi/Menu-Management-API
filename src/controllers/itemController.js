const itemService = require('../services/itemService');
const logger = require('../utils/logger');
const WriteResponse = require('../utils/response');
const mongoose = require('mongoose');

const createItem = async (req, res) => {
    try {
        const item = await itemService.createItem(req.body);
        logger.info('Item created successfully');
        return WriteResponse(res, 201, 'Item created successfully', item);
    } catch (error) {
        logger.error(`Error creating item: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getAllItems = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const items = await itemService.getAllItems(page, limit);
        logger.info('Items fetched successfully');
        return WriteResponse(res, 200, 'Items fetched successfully', items);
    } catch (error) {
        logger.error(`Error fetching items: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getItemsByCategoryId = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const items = await itemService.getItemsByCategoryId(req.params.categoryId, page, limit);
        logger.info('Items fetched successfully');
        return WriteResponse(res, 200, 'Items fetched successfully', items);
    } catch (error) {
        logger.error(`Error fetching items: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getItemsBySubCategoryId = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const items = await itemService.getItemsBySubCategoryId(req.params.subCategoryId, page, limit);
        logger.info('Items fetched successfully');
        return WriteResponse(res, 200, 'Items fetched successfully', items);
    } catch (error) {
        logger.error(`Error fetching items: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const getItem = async (req, res) => {
    try {
        const { idOrName } = req.params;
        const { page, limit } = req.query;
        let item;

        if (mongoose.Types.ObjectId.isValid(idOrName)) {
            item = await itemService.getItemById(idOrName);
        } else {
            item = await itemService.getItemByName(idOrName);
        }

        if (!item) {
            throw { status: 404, message: 'Item not found' };
        }

        logger.info('Item fetched successfully');
        return WriteResponse(res, 200, 'Item fetched successfully', item);
    } catch (error) {
        logger.error(`Error fetching item: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const updateItem = async (req, res) => {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, req.body);
        logger.info('Item updated successfully');
        return WriteResponse(res, 200, 'Item updated successfully', updatedItem);
    } catch (error) {
        logger.error(`Error updating item: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

const searchItemsByName = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const items = await itemService.searchItemsByName(req.params.name, page, limit);
        logger.info('Items fetched successfully');
        return WriteResponse(res, 200, 'Items fetched successfully', items);
    } catch (error) {
        logger.error(`Error fetching items: ${error.message}`);
        return WriteResponse(res, error.status || 500, error.message);
    }
};

module.exports = {
    createItem,
    getAllItems,
    getItemsByCategoryId,
    getItemsBySubCategoryId,
    getItem,
    updateItem,
    searchItemsByName,
};