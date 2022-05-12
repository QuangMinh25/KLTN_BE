const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TicketModel = new Schema({
    code: {
        type: String
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
    departure_date: { // Ngày đi
        type: Number,
        required: true
    },
    return_day: { // Ngày về
        type: Number
    },
    info_customer: { // Họ tên
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    subject: { // Đối tượng
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    id_card: {
        type: String,
        required: true
    },
    train: { // Chuyến tàu
        type: Schema.Types.ObjectId,
        ref: "TrainCode",
        required: true
    },
    wagons: { // Số toa tàu
        type: Number,
        required: true
    },
    seats: { // Số ghế
        type: Number,
        required: true
    },
    type_seats: { // 0 main, 1: extra
        type: Number,
        required: true,
        default: 0
    },
    price: { // Giá vé
        type: Number
    },
    reduce_object: { // Giảm đối tượng
        type: Number
    },
    promotion: { // Khuyến mãi
        type: Number
    },
    insurance: { // Bảo hiểm
        type: Number
    },
    total: { // Tổng tiền thanh toán
        type: Number
    },
    name_company: {
        type: String,
    },
    tax_code: {
        type: String
    },
    addr_company: {
        type: String
    },
    completly_payment: { // Thánh toán đầy đủ
        type: Boolean,
        default: false
    },
    payments: { // Hinh thuc thanh toan
        type: String,
        default: 0,
        required: true
    },
    return_ticket: {
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

module.exports = mongoose.model('Ticket', TicketModel);