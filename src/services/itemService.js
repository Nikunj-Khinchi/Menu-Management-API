const itemRepository = require('../repositories/itemRepository');
const categoryRepository = require('../repositories/categoryRepository');
const subCategoryRepository = require('../repositories/subCategoryRepository');

const createItem = async (data) => {
    const { categoryId, subCategoryId, name, baseAmount, discount, taxApplicable, tax } = data;

    if (!categoryId || !name || !baseAmount) {
        throw { status: 400, message: 'Category ID, Item name, and Base amount are required' };
    }

    const existingItem = await itemRepository.findOne({ name });
    if (existingItem) {
        throw { status: 400, message: 'Item already exists' };
    }

    const category = await categoryRepository.findById(categoryId);
    if (!category) {
        throw { status: 404, message: 'Category not found' };
    }

    if (subCategoryId) {
        const subCategory = await subCategoryRepository.findById(subCategoryId);
        if (!subCategory) {
            throw { status: 404, message: 'SubCategory not found' };
        }
    }

    // Calculate total amount
    data.totalAmount = baseAmount - discount + (taxApplicable ? (tax / 100) * (baseAmount - discount) : 0);

    const item = await itemRepository.create(data);
    return item;
};

const getAllItems = async (page, limit) => {
    return await itemRepository.findAll({}, page, limit);
};

const getItemsByCategoryId = async (categoryId, page, limit) => {
    return await itemRepository.findAll({ categoryId }, page, limit);
};

const getItemsBySubCategoryId = async (subCategoryId, page, limit) => {
    return await itemRepository.findAll({ subCategoryId }, page, limit);
};

const getItemById = async (id) => {
    const item = await itemRepository.findById(id);
    if (!item) {
        throw { status: 404, message: 'Item not found' };
    }
    return item;
};

const getItemByName = async (name) => {
    const item = await itemRepository.findOne({name});
    if (!item) {
        throw { status: 404, message: 'Item not found' };
    }
    return item;
}

const searchItemsByName = async (name, page, limit) => {
    return await itemRepository.findAll({ name: new RegExp(name, 'i') }, page, limit);
};

const updateItem = async (id, data) => {
    const updatedItem = await itemRepository.updateById(id, data);
    if (!updatedItem) {
        throw { status: 404, message: 'Item not found' };
    }

    // Recalculate total amount if any relevant fields change
    const { baseAmount, discount, tax, taxApplicable } = data;
    const shouldRecalculate = ['baseAmount', 'discount', 'tax', 'taxApplicable'].some(field => field in data);

    if (shouldRecalculate) {
        const finalBaseAmount = baseAmount ?? updatedItem.baseAmount;
        const finalDiscount = discount ?? updatedItem.discount;
        const finalTax = tax ?? updatedItem.tax;
        const finalTaxApplicable = taxApplicable ?? updatedItem.taxApplicable;

        updatedItem.totalAmount = finalBaseAmount - finalDiscount + (finalTaxApplicable ? (finalTax / 100) * (finalBaseAmount - finalDiscount) : 0);
        await updatedItem.save();
    }

    return updatedItem;
};

module.exports = {
    createItem,
    getAllItems,
    getItemsByCategoryId,
    getItemsBySubCategoryId,
    getItemById,
    getItemByName,
    searchItemsByName,
    updateItem,
};
