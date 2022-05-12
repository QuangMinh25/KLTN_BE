const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrainCodeModel = new Schema({
    train: {
        type: Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    train_station: { // Ga đi
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    train_station_to: { // Ga đến
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    main_road_from: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
    },
    main_road_to: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
    },
    index: {
        type: Number
    },
    wagons: {
        type: Object
    },
    blank_seats: { // Ghe trong
        type: Number,
        default: 0
    },
    block_seats: { // Ghe da dat cho
        type: Number,
        default: 0
    },
    departure_date: { // Ngày giờ đi
        type: Number,
        required: true
    },
    arrival_date: { // Ngày giờ đến
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

module.exports = mongoose.model('TrainCode', TrainCodeModel);