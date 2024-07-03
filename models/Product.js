const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        maxlength: [5, 'Price cannot be more than 5 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    image: {
        type: String,
        default: '/uploads/example.jpeg',
    },
    category: {
        type: String,
        required: [true, 'Please provide category'],
        enum: ['office', 'kitchen', 'bedroom']
    },
    company: {
        type: String,
        required: [true, 'Please provide company'],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },
    color: {
        type: [String],
        required: [true, 'Please provide color'],
        default: ['#222']
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: [true, 'Please provide inventory'],
        default: 15,
    },
    averageRating: {
        type: Number,
        required: [true, 'Please provide average rating'],
        default: 0,

    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,

    },


}, { timestamps: true })


module.exports = mongoose.model('Product', ProductSchema)