const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermission } = require('../utils');


const createReview = async (req, res) => {
    const { product: productId } = req.body
    const isValidProduct = await Product.findOne({ _id: productId })
    if (!isValidProduct) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`)
    }
    const isAlreadySubmitted = await Review.findOne({ product: productId, user: req.user.userId })
    if (isAlreadySubmitted) {
        throw new CustomError.BadRequestError('You have already submitted a review for this product')
    }
    const review = await Review.createProductReview({ ...req.body, user: req.user.userId })
    res.status(StatusCodes.CREATED).json({ review })
}
const getAllReviews = async (req, res) => {
    const reviews = await Review.find({})
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}
const getSingleReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findOne({ _id: reviewId })
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({ review })
}
const updateReview = async (req, res) => {
    const { id: reviewId } = req.params
    const { rating, title, comment } = req.body
    const review = await Review.findOne({ _id: reviewId })
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
    }
    checkPermission(req.user, review.user)
    review.rating = rating
    review.title = title
    review.comment = comment
    await review.save()

    res.status(StatusCodes.OK).json({ review })
}
const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params
    const review = await Review.findOne({ _id: reviewId })
    if (!review) {
        throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
    }
    checkPermission(req.user, review.user)
    await review.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' })
}







module.exports = {
    createReview, getAllReviews, getSingleReview, updateReview, deleteReview

}