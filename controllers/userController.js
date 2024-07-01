const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse, checkPermission } = require('../utils/index');


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
}
const getSingleUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId }).select('-password')
    if (!user) throw new CustomError.NotFoundError(`No user with id ${userId}`)
    checkPermission(req.user, user)
    res.status(StatusCodes.OK).json({ user });
}
const showCurrentUser = async (req, res) => {
    const user = req.user
    res.status(StatusCodes.OK).json({ user });
}
const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) throw new CustomError.BadRequestError('Please provide both values name and email')
    const user = await User.findOne({ _id: req.user.userId });
    if (user.email !== email) {
        const emailUser = await User.findOne({ email });
        if (emailUser) throw new CustomError.BadRequestError('Email already in use')
    }
    user.name = name;
    user.email = email;
    await user.save();
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ user: tokenUser });

}
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if (!isPasswordCorrect) throw new CustomError.UnauthorizedError('Invalid credentials')
    if (!oldPassword || !newPassword) throw new CustomError.BadRequestError('Please provide both old and new password')
    if (newPassword === oldPassword) throw new CustomError.BadRequestError('New password cannot be same as old password')
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Password updated' })
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}