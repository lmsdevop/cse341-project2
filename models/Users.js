const mongoose = require('mongoose');
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: { type: String, required: true },
    email:  { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:  { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;