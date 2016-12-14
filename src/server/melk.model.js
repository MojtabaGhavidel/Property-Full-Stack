var mongoose = require('mongoose');

var melkSchema = mongoose.Schema({
    melkType: String,
    karbari : String,
    city: String,
    sanadType: String,
    agahiTitle: String,
    email: String,
    mobile: Number,
    description: String
    
  
});

var Melk = mongoose.model('Melk', melkSchema);

module.exports = Melk;