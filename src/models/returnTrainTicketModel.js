const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReturnTicketModel = new Schema({
    ticket: [{
        type: Schema.Types.ObjectId,
        ref: "Ticket",
    }],
    code: {
        type: String,
        requried: true
    },
    id_card: {
        type: String,
        requried: true
    },
    phone: {
        type: String,
        requried: true
    },
    status: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('ReturnTicket', ReturnTicketModel);