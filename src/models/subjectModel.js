const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectModel = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    desciption: {
        type: String
    },
    group: { // 0: VN, 1: NN
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Subject', SubjectModel);