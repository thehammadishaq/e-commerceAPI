const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');


router.route('/')