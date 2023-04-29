const express = require('express');
const router = express.Router();

const cartController = require('./../controller/cart');

// Menambahkan Cart
router.post('/', cartController.addCart);

// Menampilkan cart
router.get('/', cartController.getAllCarts);

// update kuantitas
router.patch('/:id_cart', cartController.updateKuantitas);

// menghapus cart
router.delete('/:id_cart', cartController.deleteCart);

module.exports = router;