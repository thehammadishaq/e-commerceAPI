const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
        minlength: [3, 'Name cannot be less than 3 characters'],
        maxlength: [50, 'Name cannot be more than 50 characters']

    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [4, 'Password cannot be less than 4 characters'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, genSalt)
})

UserSchema.methods.comparePassword = async function (userPasword) {
    return await bcrypt.compare(userPasword, this.password)
}

module.exports = mongoose.model('User', UserSchema)