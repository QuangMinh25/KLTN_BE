const SubjectModel = require('../models/subjectModel')
exports.add = async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                statusCode: 400,
                success: false,
                message: 'Vui lòng nhập đầy đủ trường dữ liệu!'
            })
        }
        const subjects = await SubjectModel.find()
        const subject = await new SubjectModel({
            ...req.body,
            code: subjects.length + 1
        }).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Add subject success!',
            data: subject
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
        const subjects = await SubjectModel.find({
            $and: [
                { deleted_at: null }
            ]
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: subjects
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
        const subject = await SubjectModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (subject.length === 0) {
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
            data: subject
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
        const subject = await SubjectModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (subject.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const subjectUpdate = await SubjectModel.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: subjectUpdate
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
        const subject = await SubjectModel.find({
            $and: [
                { deleted_at: null },
                { _id: req.params.id }
            ]
        })
        if (subject.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Không tìm thấy'
            })
        }
        const date = new Date()
        const subjectUpdate = await SubjectModel.findByIdAndUpdate(req.params.id, {
            deleted_at: Number(date.getTime())
        }, {
            new: true
        })
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: subjectUpdate
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}
