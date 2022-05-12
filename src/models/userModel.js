const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model('User', UserModel);
module.exports = user;