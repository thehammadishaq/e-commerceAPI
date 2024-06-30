const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors/index');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await User.create(req.body)
    console.log(user);
    if (!user) throw new customError.NotFoundError("User not found")


    res.status(StatusCodes.CREATED).json({ user })
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