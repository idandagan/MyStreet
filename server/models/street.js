var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Street = new Schema({

    name: {
        type: String,
        index:true,
        unique:true,
        required: true },
    createDate: {
        type: Date,
        default: Date.now },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' }]

},{collection: 'Streets'});

module.exports = mongoose.model('Streets', Street);
