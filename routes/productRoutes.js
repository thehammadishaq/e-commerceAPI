const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');


router
    .route('/')
    .get(getAllProducts)
    .post(authenticateUser, authorizeUser('admin'), createProduct)

router
    .route('/uploadImage')
    .post(authenticateUser, authorizeUser('admin'), uploadImage)

router
    .route('/:id')
    .put(authenticateUser, authorizeUser('admin'), updateProduct)
    .delete(authenticateUser, authorizeUser('admin'), deleteProduct)
    .get(getSingleProduct)


module.exports = router;