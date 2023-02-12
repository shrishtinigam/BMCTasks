const express = require('express')
const router = express.Router()
const Product = require('../models/product');
const mongoose = require('mongoose');

const ProductsController = require('../controllers/products')

router.get('/', ProductsController.get_all_products)

router.post('/', ProductsController.create_product)

router.get('/:productId', ProductsController.get_product_by_id)

router.patch('/:productId', ProductsController.patch_product_by_id)

router.put('/:productId', ProductsController.put_product_by_id)

router.delete('/:productId', ProductsController.delete_product_by_id)

module.exports = router