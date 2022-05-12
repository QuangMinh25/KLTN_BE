const TrainCodeModel = require('../models/TrainCodeModel')
const WagonsModel = require('../models/wagonsModel')
exports.add = async (req, res, next) => {
    try {
        const wagons = await WagonsModel.find({ train: req.body.train })
        let seats = 0
        let wagonsList = {}
        await wagons.map((item) => {
            if (req.body.wagons.indexOf(Number(item.id_wagons)) !== -1) {
                seats = seats + Number(item.main_seat) + Number(item.extra_seat)
                wagonsList = {
                    ...wagonsList,
                    [item.id_wagons]: {
                        default_main_seat: item.main_seat,
                        default_extra_seat: item.extra_seat,
                        main_seat: item.main_seat,
                        extra_seat: item.extra_seat,
                        main: [],
                        extra: [],
                        type: item.type,
                        description: item.description
                    }
                }
            }
        })

        const trainCode = await new TrainCodeModel({
            ...req.body,
            blank_seats: seats,
            wagons: wagonsList
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add train code success!',
            data: trainCode
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
        const trainCodes = await TrainCodeModel.find({
            $and: [
                { deleted_at: null },
                { date: req.query.date },
                { train: req.query.train },
                { main_road_from: req.query.train_station },
                { main_road_to: req.query.train_station_to },
            ]
        }).populate('train').populate('train_station').populate('train_station_to').populate('main_road_from').populate('main_road_to')
        const result = trainCodes.reduce(function (r, a) {
            r[a.train._id] = r[a.train._id] || [];
            r[a.train._id].push(a);
            return r;
        }, Object.create(null));
        let train = {
            train_goes: result
        }
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trainCodes
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
        console.log('<><><><>', req.query)
        const trainCodes = await TrainCodeModel.find({
            $or: [
                { 
                    $and: [
                        { deleted_at: null },
                        { date: req.query.date_start },
                        { train_station: req.query.train_station },
                        { train_station_to: req.query.train_station_to },
                    ]
                },
                { 
                    $and: [
                        { deleted_at: null },
                        { date: req.query.date_start },
                        { main_road_from: req.query.train_station },
                        { main_road_to: req.query.train_station_to },
                    ]
                 }
            ]
        }).populate('train').populate('train_station').populate('train_station_to')
        const result = trainCodes.reduce(function (r, a) {
            r[a.train._id] = r[a.train._id] || [];
            r[a.train._id].push(a);
            return r;
        }, Object.create(null));
        let train = {
            train_goes: result
        }
        // 
        if (req.query.type_station === 'true') {
            const trainCodesReturn = await TrainCodeModel.find({
                $or: [
                    { 
                        $and: [
                            { deleted_at: null },
                            req.query.date_end ? { date: req.query.date_end } : {},
                            req.query.train_station_to ? { train_station: req.query.train_station_to } : {},
                            req.query.train_station ? { train_station_to: req.query.train_station } : {},
                        ]
                    },
                    { 
                        $and: [
                            req.query.train_station_to ? { main_road_from: req.query.train_station_to } : {},
                            req.query.train_station ? { main_road_to: req.query.train_station } : {},
                        ]
                     }
                ]
            }).populate('train').populate('train_station').populate('train_station_to')
            let resultReturn = null
            if (trainCodesReturn.length > 0) {
                resultReturn = trainCodesReturn.reduce(function (r, a) {
                    r[a.train._id] = r[a.train._id] || [];
                    r[a.train._id].push(a);
                    return r;
                }, Object.create(null));
            }
            train = {
                ...train,
                return_train: resultReturn
            }
        }
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: train
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
        const trainCode = await TrainCodeModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (trainCode.length === 0) {
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
            data: trainCode
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
        const trainCode = await TrainCodeModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (trainCode.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const trainCodeUpdate = await TrainCodeModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trainCodeUpdate
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
        const trainCode = await TrainCodeModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (trainCode.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const trainCodeUpdate = await TrainCodeModel.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trainCodeUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}
