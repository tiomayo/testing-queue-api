const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    service: { type: String, enum : ['general','emergency'], default: 'general'},
    date: { type: Date },
    seq: { type: Number, default: 0, max: 999 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Queue', schema);


