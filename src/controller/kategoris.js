const kategoriModel = require('../models/kategoris');
const fs = require('fs');
const path = require('path');

const getAllKategoris = async (req, res) => {
    try {
        const [data] = await kategoriModel.getAllKategoris();
        res.json({
            message: "Get All Kategori success",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const addKategori = async (req, res) => {

    if (!req.file) {
        res.status(422).json({
            message: "Image harus diisi"
        })
    }

    const { body } = req;
    const image = `images/${req.file.filename}`;

    if (!body.nama_kategori) {
        res.status(400).json({
            message: 'Anda mengirim data yang salah !',
            data: body
        })
    }

    try {
        await kategoriModel.addKategori(body, image);
        res.status(201).json({
            message: 'create new product success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateKategori = async (req, res) => {
    if (!req.file) {
        res.status(422).json({
            message: "Image harus diisi"
        })
    }

    const { body } = req;
    const image = `images/${req.file.filename}`;
    const { id_kategori } = req.params;

    if (!body.nama_kategori) {
        res.status(400).json({
            message: 'Anda mengirim data yang salah !',
            data: body
        })
    }

    const [findKategori] = await kategoriModel.findById(id_kategori);
    if (findKategori.length == 0) {
        res.status(404).json({
            message: `Data dengan id '${id_kategori}' tidak ditemukan !`,
        })
    }

    try {
        await kategoriModel.updateKategori(body, id_kategori, image);
        removeImage(findKategori[0].gambar);
        res.json({
            message: 'update product succes',
            data: {
                id_kategori,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const deleteKategori = async (req, res) => {
    const { id_kategori } = req.params;

    const [findKategori] = await kategoriModel.findById(id_kategori);
    if (findKategori.length == 0) {
        res.status(404).json({
            message: `Data dengan id '${id_kategori}' tidak ditemukan !`,
        })
        return false;
    }

    try {
        removeImage(findKategori[0].gambar);
        await kategoriModel.deleteKategori(id_kategori);
        res.json({
            message: 'delete success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const removeImage = (filepath) => {
    filepath = path.join(__dirname, '../../', filepath);
    fs.unlink(filepath, err => console.log(err));
}

module.exports = {
    getAllKategoris,
    addKategori,
    updateKategori,
    deleteKategori
}