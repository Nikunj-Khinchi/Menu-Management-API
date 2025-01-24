const SubCategory = require("../models/subCategoryModel");
const BaseRepository = require("./baseRepository");

class SubCategoryRepository extends BaseRepository {
    constructor() {
        super(SubCategory, ["categoryId"]);
    }
}

module.exports = new SubCategoryRepository();
