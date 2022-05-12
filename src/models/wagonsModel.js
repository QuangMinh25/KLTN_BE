const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WagonsModel = new Schema({
    id_wagons: {
        type: Number,
        required: true
    },
    floors: {
        type: Number,
        required: true,
    },
    train: {
        type: Schema.Types.ObjectId,
        ref: "Train",
        required: true,
    },
    extra_seat: {
        type: Number,
        default: 0
    },
    type: {
        type: Number, // 0 Ngồi, 1: Nằm
    },
    description: {
        type: String
    },
    main_seat: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Wagons', WagonsModel);