const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    createDate: {type: Date, required: true},
    lastModified: {type: Date, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('blogs', blogSchema);