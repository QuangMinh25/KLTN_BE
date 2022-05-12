const TicketModel = require('../models/TicketModel')
const TrainCodeModel = require('../models/TrainCodeModel')
const sendMail = require('./mailSchema')
exports.add = async (req, res, next) => {
    try {
        const code = 'DSVN' + (Number(new Date().getTime()) / 1000).toFixed(0)
        const ticket = await new TicketModel({
            code: code,
            ...req.body,
        }).save()
        sendMail.send(code, req.body.email)
        let trainCode = await TrainCodeModel.findById(req.body.train)
        // type seat 0 is main 1 is extra
        const type_seat = req.body.type_seats === 0 ? 'main' : 'extra'
        trainCode.wagons[req.body.wagons][type_seat].push(req.body.seats)
        trainCode.wagons[req.body.wagons][`${type_seat}_seat`] = trainCode.wagons[req.body.wagons][`${type_seat}_seat`] - 1
        await TrainCodeModel.findByIdAndUpdate(req.body.train, {
            blank_seats: trainCode.blank_seats - 1,
            wagons: trainCode.wagons
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add ticket success!',
            data: ticket
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.get = async (req, res, next) => {
    try {
        const totalData = await TicketModel.count()
        const ticket = await TicketModel.find({
            $and: [
                { deleted_at: null },
                req.query.code ? { code: req.query.code } : {},
                req.query.phone ? { phone: req.query.phone } : {},
            ]
        }).sort({ created_at: 1 }).skip(Number(req.query.skip)).limit(Number(req.query.limit)).populate('train_station').populate('train_station_to').populate('subject').populate({
            path: 'train',
            populate: {
                path: 'train',
            },
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station'
            }
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station_to'
            }
        })
        const result = ticket.reduce(function (r, a) {
            r[a.train.main_road_from] = r[a.train.main_road_from] || [];
            r[a.train.main_road_from].push(a);
            return r;
        }, Object.create(null));
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: result,
            totalData
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}


exports.getAdmin = async (req, res, next) => {
    try {
        const totalData = await TicketModel.count({
            $and: [
                { deleted_at: null },
                { return_ticket: false },
                req.query.code ? { code: req.query.code } : {},
                req.query.phone ? { phone: req.query.phone } : {},
            ]
        })
        const ticket = await TicketModel.find({
            $and: [
                { deleted_at: null },
                { return_ticket: false },
                req.query.code ? { code: req.query.code } : {},
                req.query.phone ? { phone: req.query.phone } : {},
            ]
        }).sort({ created_at: 1 }).skip(Number(req.query.skip)).limit(Number(req.query.limit)).populate('train_station').populate('train_station_to').populate('subject').populate({
            path: 'train',
            populate: {
                path: 'train',
            },
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station'
            }
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station_to'
            }
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: ticket,
            totalData
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.getId = async (req, res, next) => {
    try {
        const ticket = await TicketModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        }).populate('train_station').populate('train_station_to').populate('subject').populate({
            path: 'train',
            populate: {
                path: 'train',
            },
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station'
            }
        }).populate({
            path: 'train',
            populate: {
                path: 'train_station_to'
            }
        })
        if (ticket.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: ticket
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}



exports.edit = async (req, res, next) => {
    try {
        const ticket = await TicketModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (ticket.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const ticketUpdate = await TicketModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: ticketUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const ticket = await TicketModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (ticket.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const ticketUpdate = await TicketModel.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: ticketUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}