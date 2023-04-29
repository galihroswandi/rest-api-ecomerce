const express = require('express');
const { getAllCheckout, addCheckout, deleteCheckout } = require('../controller/checkout');
const router = express.Router();

// Get All checkout where id_user
router.get('/:id_user', getAllCheckout);

// Post checkout
router.post('/', addCheckout);

// Delete checkout
router.delete('/:id_checkout', deleteCheckout);

module.exports = router;