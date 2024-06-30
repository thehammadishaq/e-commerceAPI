const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'admin' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
}
const getSingleUser = async (req, res) => {
    res.send('getSingleUser')
}
const showCurrentUser = async (req, res) => {
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