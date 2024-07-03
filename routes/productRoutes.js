const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');


router
    .route('/')
    .get(getAllProducts)
    .post([authenticateUser, authorizePermissions('admin')], createProduct)

router
    .route('/uploadImage')
    .post([authenticateUser, authorizePermissions('admin')], uploadImage)

router
    .route('/:id')
    .put([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)
    .get(getSingleProduct)


module.exports = router;