const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    name: String,
    img: String,
    title: String,
});

module.exports = mongoose.model('People', peopleSchema);