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
    res.status(StatusCodes.CREATED).json({ user: tokenUser })

}



const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new customError.BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new customError.UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new customError.UnauthenticatedError('Invalid credentials')
    }
    const tokenUser = {
        name: user.name, userId: user._id, role: user
            .role
    }
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

module.exports = {
    register,
    login,
    logout
}