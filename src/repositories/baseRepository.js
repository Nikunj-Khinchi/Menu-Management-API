const mongoose = require("mongoose");

class BaseRepository {
    constructor(model, defaultPopulateFields = []) {
        this.model = model;
        this.defaultPopulateFields = defaultPopulateFields;
    }

    _validateObjectId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }
    }

    _applyPopulation(query, populateFields = []) {
        const fields = populateFields.length ? populateFields : this.defaultPopulateFields;
        fields.forEach((field) => query.populate(field));
        return query;
    }

    async create(data) {
        return this.model.create(data);
    }

    async findAll(query = {}, page = 1, limit = 10, populateFields = []) {
        page = Math.max(1, parseInt(page) || 1); // Ensure page is at least 1
        limit = Math.min(Math.max(1, parseInt(limit) || 10), 100); // Ensure limit is at least 1 and at most 100
    
        const skip = (page - 1) * limit;
        const totalCount = await this.model.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
    
        const queryBuilder = this.model.find(query).skip(skip).limit(limit);
        this._applyPopulation(queryBuilder, populateFields);
    
        return {
            results: await queryBuilder,
            totalPages,
            totalCount,
        };
    }
    async findById(id, populateFields = []) {
        this._validateObjectId(id);

        const query = this.model.findById(id);
        return this._applyPopulation(query, populateFields).exec();
    }

    async findOne(query, populateFields = []) {
        // Convert query values to case-insensitive regular expressions
        const caseInsensitiveQuery = {};
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                caseInsensitiveQuery[key] = new RegExp(query[key], 'i');
            }
        }
    
        const queryBuilder = this.model.findOne(caseInsensitiveQuery);
        return this._applyPopulation(queryBuilder, populateFields).exec();
    }

    async updateById(id, data, populateFields = []) {
        this._validateObjectId(id);

        const query = this.model.findByIdAndUpdate(id, data, { new: true });
        return this._applyPopulation(query, populateFields).exec();
    }

    async deleteById(id) {
        this._validateObjectId(id);
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;
