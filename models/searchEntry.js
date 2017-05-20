var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
    term: String,
    when: Date
});

var Search =  mongoose.model('Search', searchSchema);

module.exports = Search;