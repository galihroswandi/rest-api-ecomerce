const express = require('express');

const router = express.Router();

const productController = require('./../controller/products');

// Menambahkan Product
router.post('/', productController.addProduct);

// GET products
router.get('/', productController.getAllProducts);

// UPDATE - PATCH
router.put('/:id_product', productController.updateProduct);

// DELETE - DELETE
router.delete('/:id_product', productController.deleteProduct);

module.exports = router;