const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
}
const getSingleUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId }).select('-password')
    if (!user) throw new CustomError.NotFoundError(`No user with id ${userId}`)
    res.status(StatusCodes.OK).json({ user });
}
const showCurrentUser = async (req, res) => {
    const user = req.user
    res.status(StatusCodes.OK).json({ user });
    console.log(user);
    res.send('showCurrentUser')
}
const updateUser = async (req, res) => {
    res.send('updateUser')
}
const updateUserPassword = async (req, res) => {
    res.send('updateUserPassword')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}