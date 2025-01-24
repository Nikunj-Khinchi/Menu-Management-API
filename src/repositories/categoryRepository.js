const Category = require("../models/categoryModel");
const BaseRepository = require("./baseRepository");

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }
}

module.exports = new CategoryRepository();
