const mongoose = require('mongoose');

const guild = new mongoose.Schema({
    name: { type: String },
    id: { type: String, unique: true, required: true },
    ownerId: { type: String }
});

module.exports = mongoose.model('Guild', guild);