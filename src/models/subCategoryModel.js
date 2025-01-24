const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
    taxApplicability: { type: Boolean, default: false }, // Inherits from Category by default
    tax: { type: Number, default: 0 }, // Inherits from Category by default
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
