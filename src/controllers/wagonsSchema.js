const WagonsModels = require('../models/wagonsModel')

exports.add = async (req, res, next) => {
    try {
        const wagonsExists = await WagonsModels.find({
            $and: [
                { id_wagons: req.body.id_wagons },
                { train: req.body.train }
            ]
        })
        if (wagonsExists.length !== 0) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                message: 'Toa tàu của chuyến tàu này đã tồn tại!'
            })
        }
        const wagons = await new WagonsModels({
            ...req.body
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add wagons success!',
            data: wagons
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
        const wagons = await WagonsModels.find({
            $and: [
                { deleted_at: null },
                { train: req.query.train }
            ]
        }).populate('train')
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: wagons
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
        const wagons = await WagonsModels.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        }).populate('train')
        if (wagons.length === 0) {
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
            data: wagons
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
        const wagons = await WagonsModels.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (wagons.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const wagonsUpdate = await WagonsModels.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: wagonsUpdate
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
        const wagons = await WagonsModels.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (wagons.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const wagonsUpdate = await WagonsModels.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: wagonsUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}
