const StationModel = require('../models/stationModel')
exports.add = async (req, res, next) => {
    try {
        if (!req.body.code) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                message: 'Vui lòng nhập đầy đủ trường dữ liệu!'
            })
        }
        const stationExists = await StationModel.findOne({'code': req.body.code})
        if (stationExists) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                message: 'Ga tàu đã tồn tại!'
            })
        }
        const station = await new StationModel({
            ...req.body
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add station success!',
            data: station
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
        const stationExists = await StationModel.find({
            $and: [
                { deleted_at: null }
            ]
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: stationExists
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
        const stationExists = await StationModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (stationExists.length === 0) {
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
            data: stationExists
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
        const stationExists = await StationModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (stationExists.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const stationtUpdate = await StationModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: stationtUpdate
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
        const stationExists = await StationModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (stationExists.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const stationUpdate = await StationModel.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: stationUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}