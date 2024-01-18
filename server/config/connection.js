const mongoose = require('mongoose');

mongoose.connect(process.env.PORT || 'mongodb://127.0.0.1:27017/igr');

module.exports = mongoose.connection;