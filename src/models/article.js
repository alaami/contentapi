const mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Article', ArticleSchema);