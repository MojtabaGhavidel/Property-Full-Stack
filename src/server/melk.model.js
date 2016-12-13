var mongoose = require('mongoose');

var melkSchema = mongoose.Schema({
    name: String,
    weight: Number,
    age: Number
});

var Melk = mongoose.model('Melk', melkSchema);

module.exports = Melk;