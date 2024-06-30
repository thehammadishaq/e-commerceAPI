const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors/index')
const { attachCookiesToResponse } = require('../utils/index')

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const isEmailAlreadyExist = await User.findOne({ email })
    if (isEmailAlreadyExist) {
        throw new customError.BadRequestError('Email already exist')
    }
    const isFirstUser = await User.countDocuments({}) === 0
    const role = isFirstUser ? 'admin' : 'user'
    const user = await User.create({ name, email, password, role })
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ tokenUser })

}



const login = async (req, res) => {
    res.send('login user')
}
const logout = async (req, res) => {
    res.send('logout user')
}

module.exports = {
    register,
    login,
    logout
}