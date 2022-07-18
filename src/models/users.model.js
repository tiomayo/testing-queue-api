const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nik: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, lowercase: true, sparse: true },
    age: Number,
    address: String,
}, {
    timestamps: true
});

module.exports = mongoose.model("Users", userSchema);


