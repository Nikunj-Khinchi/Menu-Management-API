require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb//localhost:27017/MenuManagementSystem',
};

module.exports = config;

