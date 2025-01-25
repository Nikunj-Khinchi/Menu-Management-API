const subCategoryRepository = require('../repositories/subCategoryRepository');
const categoryRepository = require('../repositories/categoryRepository');

const createSubCategory = async (data) => {
    const { categoryId, name, taxApplicability, tax } = data;

    if (!categoryId || !name) {
        throw { status: 400, message: 'Category ID and SubCategory name are required' };
    }

    const existingSubCategory = await subCategoryRepository.findOne({ name });
    if (existingSubCategory) {
        throw { status: 400, message: 'SubCategory already exists' };
    }

    const category = await categoryRepository.findById(categoryId);
    if (!category) {
        throw { status: 404, message: 'Category not found' };
    }

    // Default to category tax details if not provided
    data.taxApplicability = taxApplicability ?? category.taxApplicability;
    data.tax = tax ?? category.tax;

    const subCategory = await subCategoryRepository.create(data);
    return subCategory;
};

const getAllSubCategories = async (page, limit) => {
    return await subCategoryRepository.findAll({}, page, limit);
};

const getSubCategoriesByCategoryId = async (categoryId, page, limit) => {
    return await subCategoryRepository.findAll({ categoryId }, page, limit);
};

const getSubCategoryById = async (id) => {
    const subCategory = await subCategoryRepository.findById(id);
    if (!subCategory) {
        throw { status: 404, message: 'SubCategory not found' };
    }
    return subCategory;
};

const getSubCategoryByName = async (name) => {
    const subCategory = await subCategoryRepository.findOne({name});
    if (!subCategory) {
        throw { status: 404, message: 'SubCategory not found' };
    }
    return subCategory;
};

const updateSubCategory = async (id, data) => {
    if (data.taxApplicable && !data.tax) {
        throw { status: 400, message: 'Tax are required if tax is applicable' };
    }
    const updatedSubCategory = await subCategoryRepository.updateById(id, data);
    if (!updatedSubCategory) {
        throw { status: 404, message: 'SubCategory not found' };
    }
    return updatedSubCategory;
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoriesByCategoryId,
    getSubCategoryById,
    getSubCategoryByName,
    updateSubCategory,
};
