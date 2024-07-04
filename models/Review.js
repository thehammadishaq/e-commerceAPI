const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true

    },
    title: {
        type: String,
        required: [true, 'please provide title'],
        maxlength: [50, 'title cannot be more than 50 characters']


    },
    comment: {
        type: String,

        required: [true, 'please provide comment'],
        maxlength: [500, 'comment cannot be more than 500 characters']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }

}, { timestamps: true })

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.statics.calculateAverageRating = async function (productId) {
    console.log(productId);
}

ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
})
ReviewSchema.post('remove', async function () {
    await this.constructor.calculateAverageRating(this.product);
})

module.exports = mongoose.model('Review', ReviewSchema)