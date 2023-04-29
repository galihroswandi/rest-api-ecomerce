const productsModel = require('./../models/products');
const fs = require('fs');
const path = require('path');

const getAllProducts = async (req, res) => {
    try {
        const [data] = await productsModel.getAllProducts();
        res.json({
            message: "Get All Product success",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getSingleProduct = async (req, res) => {

    const { id_product } = req.params;

    try {
        const [data] = await productsModel.findById(id_product);
        res.json({
            message: "Get All Product success",
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const addProduct = async (req, res) => {

    if (!req.file) {
        const error = new Error("Image Harus Diisi");
        error.errorStatus = 422;
        throw error;
    }

    const { body } = req;
    const image = `images/${req.file.filename}`;

    if (!body.nama_product || !body.deskripsi || !body.harga || !body.id_kategori) {
        res.status(400).json({
            message: 'Anda mengirim data yang salah !',
            data: body
        })
    }

    try {
        await productsModel.addProduct(body, image);
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

const updateProduct = async (req, res) => {
    if (!req.file) {
        const error = new Error("Image Harus Diisi");
        error.errorStatus = 422;
        throw error;
    }

    const { body } = req;
    const image = `images/${req.file.filename}`;
    const { id_product } = req.params;

    if (!body.nama_product || !body.deskripsi || !body.harga || !body.id_kategori) {
        res.status(400).json({
            message: 'Anda mengirim data yang salah !',
            data: body
        })
    }

    const [findProduct] = await productsModel.findById(id_product);
    if (findProduct.length == 0) {
        res.status(404).json({
            message: `Data dengan id '${id_product}' tidak ditemukan !`,
        })
    }

    try {
        await productsModel.updateProduct(body, id_product, image);
        removeImage(findProduct[0].gambar);
        res.json({
            message: 'update product succes',
            data: {
                id_product,
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

const deleteProduct = async (req, res) => {
    const { id_product } = req.params;

    const [findProduct] = await productsModel.findById(id_product);
    if (findProduct.length == 0) {
        res.status(404).json({
            message: `Data dengan id '${id_product}' tidak ditemukan !`,
        })
        return false;
    }

    try {
        removeImage(findProduct[0].gambar);
        await productsModel.deleteProduct(id_product);
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
    getAllProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    getSingleProduct
}