const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    posttext: String,
});

module.exports = mongoose.model('Post', PostSchema);
