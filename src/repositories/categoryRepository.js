// const Category = require('../models/category');

// class CategoryRepository {
//     async create(data) {
//         return await Category.create(data);
//     }

//     async findAll() {
//         return await Category.find();
//     }

//     async findById(id) {
//         return await Category.findById(id);
//     }

//     async findByName(name) {
//         return await Category.findOne({ name });
//     }

//     async update(id, data) {
//         return await Category.findByIdAndUpdate(id, data, { new: true });
//     }

//     async delete(id) {
//         return await Category.findByIdAndDelete(id);
//     }
// }

// module.exports = new CategoryRepository();
const Category = require("../models/categoryModel");
const BaseRepository = require("./baseRepository");

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }
}

module.exports = new CategoryRepository();
