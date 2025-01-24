const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    taxApplicability: { type: Boolean, default: false },
    tax: { type: Number, default: 0 },
    taxType: { type: String, default: null },
});

module.exports = mongoose.model('Category', CategorySchema);
