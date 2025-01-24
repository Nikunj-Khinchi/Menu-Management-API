const categoryRepository = require('../repositories/categoryRepository');

const createCategory = async (data) => {
    const { name, image, description, taxApplicability, tax, taxType } = data;

    if (!name) {
        throw { status: 400, message: 'Category name is required' };
    }

    if (taxApplicability && (!tax || !taxType)) {
        throw { status: 400, message: 'Tax and tax type are required if tax is applicable' };
    }

    const category = await categoryRepository.create(data);
    return category;
};

const getAllCategories = async (page, limit) => {
    return await categoryRepository.findAll({}, page, limit);
};

const getCategoryById = async (id) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
        throw { status: 404, message: 'Category not found' };
    }
    return category;
};

const getCategoryByName = async (name) => {
    const category = await categoryRepository.findOne({name});
    if (!category) {
        throw { status: 404, message: 'Category not found' };
    }
    return category;
}

const updateCategory = async (id, data) => {

    if (data.taxApplicability && (!data.tax || !data.taxType)) {
        throw { status: 400, message: 'Tax and tax type are required if tax is applicable' };
    }

    const updatedCategory = await categoryRepository.updateById(id, data);
    if (!updatedCategory) {
        throw { status: 404, message: 'Category not found' };
    }
    return updatedCategory;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateCategory,
};