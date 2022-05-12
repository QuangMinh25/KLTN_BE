const jwt = require('jsonwebtoken')
const brcypt = require('bcryptjs')
// ----------------------------
const UserModel = require('../models/userModel')

exports.login = async (req, res) => {
    try {
        const userExist = await UserModel.findOne({ username: req.body.username });
        if (!userExist) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Tài khoản không tồn tại!',
            })
        }
        const isEqual = await brcypt.compare(req.body.password, userExist.password)
        if (isEqual) {
            const token = jwt.sign({ userId: userExist.id, phone: userExist.username }, '4GhdHJjdkJKKHUHKJBJHH8Gi', { expiresIn: '30d' })
            return res.status(200).send({
                statusCode: 200,
                message: "Success!",
                success: true,
                data: {
                    ...userExist._doc,
                    token: token
                }
            })
        }
        return res.status(401).send({
            statusCode: 401,
            success: false,
            message: 'Mật khẩu khôgn chính xác!'
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.register = async (req, res) => {
    try {
        const userExist = await UserModel.findOne({ username: req.body.username });
        if (userExist) {
            return res.status(404).send({
                statusCode: 404,
                success: false,
                message: 'Tài khoản đã tồn tại!',
            })
        }
        req.body.password = await brcypt.hashSync(req.body.password)
        const user = await new UserModel(req.body).save()
        return res.status(200).send({
            statusCode: 200,
            success: true,
            message: 'Success!',
            data: user
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}

exports.profile = async (req, res) => {
    try {
        const decodedToken = await jwt.verify(req.headers.authorization, '4GhdHJjdkJKKHUHKJBJHH8Gi')
        if (decodedToken) {
            const user = await UserModel.findById(decodedToken.userId)
            return res.status(200).send({
                statusCode: 200,
                success: true,
                message: 'Success!',
                data: user
            })
        }
        return res.status(401).send({
            statusCode: 401,
            success: false,
            message: 'Vui lòng đăng nhập!'
        })
    } catch (e) {
        return res.status(500).send({
            statusCode: 500,
            success: false,
            message: 'Đã xảy ra lỗi'
        })
    }
}