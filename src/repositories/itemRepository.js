// const Item = require('../models/itemModel');
// const BaseRepository = require('./baseRepository');
// const mongoose = require('mongoose');

// class ItemRepository extends BaseRepository {
//     constructor() {
//         super(Item);
//     }

//     // Helper function to populate common fields
//     _populateQuery(query) {
//         return query.populate('categoryId').populate('subCategoryId');
//     }

//     async findAll(query = {}, page = 1, limit = 10) {
//         const skip = (parseInt(page) - 1) * parseInt(limit);
//         const totalCount = await this.model.countDocuments(query);
//         const totalPages = Math.ceil(totalCount / limit);
//         const queryBuilder = this.model.find(query).limit(parseInt(limit)).skip(skip);
//         const results = await this._populateQuery(queryBuilder);

//         return {
//             results,
//             totalPages,
//             totalCount
//         };
//     }

//     async findById(id) {
//         this._validateObjectId(id);
//         const query = this.model.findById(id);
//         return this._populateQuery(query);
//     }

//     async findByName(name) {
//         const query = this.model.findOne({ name });
//         return this._populateQuery(query);
//     }

//     async findBySubCategoryId(subCategoryId) {
//         const query = this.model.find({ subCategoryId });
//         return this._populateQuery(query);
//     }

//     async findByCategoryId(categoryId) {
//         const query = this.model.find({ categoryId });
//         return this._populateQuery(query);
//     }

//     async updateById(id, data) {
//         this._validateObjectId(id);
//         const query = this.model.findByIdAndUpdate(id, data, { new: true });
//         return this._populateQuery(query);
//     }
// }

// module.exports = new ItemRepository();

// Compare this snippet from MenuMangementSystem/src/services/baseService.js:
const Item = require("../models/itemModel");
const BaseRepository = require("./baseRepository");

class ItemRepository extends BaseRepository {
    constructor() {
        super(Item, ["categoryId", "subCategoryId"]);
    }
}

module.exports = new ItemRepository();