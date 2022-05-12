const TrainModel = require('../models/TrainModel')
exports.add = async (req, res, next) => {
    try {
        if (!req.body.code) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                message: 'Vui lòng nhập đầy đủ trường dữ liệu!'
            })
        }
        const train = await new TrainModel({
            ...req.body,
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add train success!',
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

exports.get = async (req, res, next) => {
    try {
        const trains = await TrainModel.find({
            $and: [
                { deleted_at: null }
            ]
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trains
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
        const train = await TrainModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (train.length === 0) {
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



exports.edit = async (req, res, next) => {
    try {
        const train = await TrainModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (train.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const trainUpdate = await TrainModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trainUpdate
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
        const train = await TrainModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (train.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const trainUpdate = await TrainModel.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: trainUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}
