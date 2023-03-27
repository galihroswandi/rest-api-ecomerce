const express = require('express');

const router = express.Router();

const kategoriController = require('./../controller/kategoris');

// Menambahkan Product
router.post('/', kategoriController.addKategori);

// GET products
router.get('/', kategoriController.getAllKategoris);

// UPDATE - PUT
router.put('/:id_kategori', kategoriController.updateKategori);

// DELETE - DELETE
router.delete('/:id_kategori', kategoriController.deleteKategori);

module.exports = router;