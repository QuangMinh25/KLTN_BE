const ReturnTicketModel = require('../models/returnTrainTicketModel')
const TicketModel = require('../models/TicketModel')
const TrainCodeModel = require('../models/TrainCodeModel')

exports.add = async (req, res, next) => {
    try {
        for (let i = 0; i < req.body.ticket.length; i++) {
            await TicketModel.findByIdAndUpdate(req.body.ticket[i], {
                return_ticket: true
            }, {
                new: true
            })
        }
        const returnTicket = await new ReturnTicketModel({
            ...req.body
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add return ticket success!',
            data: returnTicket
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
        const returnTicket = await ReturnTicketModel.find({
            $and: [
                { deleted_at: null },
                { code: req.query.code },
                { id_card: req.query.id_card },
                { phone: req.query.phone },
            ]
        }).populate('ticket')
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add return ticket success!',
            data: returnTicket
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.gets = async (req, res, next) => {
    try {
        const returnTicket = await ReturnTicketModel.find({
            $and: [
                { deleted_at: null },
            ]
        }).populate({
            path: 'ticket',
            populate: {
                path: 'train_station'
            }
        }).populate({
            path: 'ticket',
            populate: {
                path: 'train_station_to'
            }
        }).sort({ updated_at: -1 })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add return ticket success!',
            data: returnTicket
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
        const returnTicket = await ReturnTicketModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (returnTicket.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const returnTicketUpdate = await ReturnTicketModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: returnTicketUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.acceptReturnTicket = async (req, res, next) => {
    try {
        const returnTicket = await ReturnTicketModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        }).populate('ticket')
        if (returnTicket.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        for (let i = 0; i < returnTicket[0].ticket.length; i++) {
            // update train code
            let trainCode = await TrainCodeModel.findById(returnTicket[0].ticket[i].train);
            const type_seat = returnTicket[0].ticket[i].type_seats === 0 ? 'main' : 'extra'
            trainCode.wagons[returnTicket[0].ticket[i].wagons][type_seat].splice(trainCode.wagons[returnTicket[0].ticket[i].wagons][type_seat].indexOf(returnTicket[0].ticket[i].seats), 1)
            trainCode.wagons[returnTicket[0].ticket[i].wagons][`${type_seat}_seat`] = trainCode.wagons[returnTicket[0].ticket[i].wagons][`${type_seat}_seat`] + 1;
            console.log(returnTicket[0].ticket[i].train);
            await TrainCodeModel.findByIdAndUpdate(returnTicket[0].ticket[i].train, {
                ...trainCode._doc,
                blank_seats: Number(trainCode.blank_seats) + 1,
                wagons: trainCode.wagons
            }, {
                new: true
            });
            // Delete Ticket
            await TicketModel.findByIdAndUpdate(returnTicket[0].ticket[i]._id, {
                deleted_at: new Date().getTime()
            }, {
                new: true
            });
        }
        await ReturnTicketModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        });
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: returnTicket
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}