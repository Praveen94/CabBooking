var mongoose = require('mongoose');
var peopleSchema = mongoose.Schema({
    Name: String,
    City: String,
    Email: String
});

module.exports = mongoose.model('people', peopleSchema);
