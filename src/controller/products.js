const productsModel = require('./../models/products');

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

const addProduct = async (req, res) => {

    const { body } = req;

    if (!body.nama_product || !body.deskripsi || !body.harga || !body.gambar) {
        res.status(400).json({
            message: 'Anda mengirim data yang salah !',
            data: body
        })
    }

    try {
        await productsModel.addProduct(body);
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
    const { id_product } = req.params;
    const { body } = req;

    try {
        await productsModel.updateProduct(body, id_product);
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

    try {
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

module.exports = {
    getAllProducts,
    updateProduct,
    addProduct,
    deleteProduct
}