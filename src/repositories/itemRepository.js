const Item = require("../models/itemModel");
const BaseRepository = require("./baseRepository");

class ItemRepository extends BaseRepository {
    constructor() {
        super(Item, ["categoryId", "subCategoryId"]);
    }
}

module.exports = new ItemRepository();