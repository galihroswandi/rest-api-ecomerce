const cartModel = require('./../models/cart');
const productsModel = require('./../models/products');

const getAllCarts = async (req, res) => {
    try {
        const [data] = await cartModel.getAllCart();
        res.status(200).json({
            message: "Get All Cart Success",
            data,
        })
    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: err
        })
    }
}

const addCart = async (req, res) => {
    const { body } = req;

    if (!body.id_product || !body.uid || !body.kuantitas) {
        res.status(400).json({
            message: "Anda mengirim data yang salah!",
            data: body
        })
        return false;
    }

    // Cek jika yang diinputkan telah ada di keranjang
    const [findCart] = await cartModel.findCartByIDProduct(body.id_product);
    if (findCart.length > 0) {
        const [resProduct] = await productsModel.findById(body.id_product);

        // hitung ulang totalHarga
        const totalKuantitas = parseInt(findCart[0].kuantitas) + parseInt(body.kuantitas);
        const total = parseInt(resProduct[0].harga) * totalKuantitas;

        // hitung ulang kuantitas
        const newKuantitas = parseInt(findCart[0].kuantitas) + 1;
        const id_cart = findCart[0].id_cart;

        try {
            await cartModel.updateKuantitas(newKuantitas, total, id_cart);
            res.status(201).json({
                message: "update kuantitas success",
                data: body
            })
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                serverMessage: err
            })
        }
        return false;
    }


    // Calculasi Harga * Kuantitas
    const [resProduct] = await productsModel.findById(body.id_product);
    const totalHarga = parseInt(resProduct[0].harga) * parseInt(body.kuantitas);


    try {
        await cartModel.addCart(body, totalHarga);
        res.status(201).json({
            message: "create new cart success",
            data: body,
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            serverMessage: err
        })
    }
}

const updateKuantitas = async (req, res) => {
    const { body } = req;
    const { id_cart } = req.params;

    if (!body.kuantitas) {
        res.status(400).json({
            message: "Anda mengirim data yang salah!",
            data: body
        })
        return false;
    }

    // hitung ulang totalHarga
    try {
        const [findCart] = await cartModel.findCart(id_cart);
        const id_product = findCart[0].id_product;
        const [resProduct] = await productsModel.findById(id_product);

        const hargaAsli = parseInt(resProduct[0].harga);
        const newKuantitas = parseInt(body.kuantitas);
        let newHarga = hargaAsli * newKuantitas;

        try {
            await cartModel.updateKuantitas(body.kuantitas, newHarga, id_cart);
            res.status(201).json({
                message: `kuantitas berhasil di update !`,
                data: body
            })
        } catch (err) {
            res.status(500).json({
                message: "Internal server error",
                serverMessage: err
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            serverMessage: err
        })
        return false;
    }

}

const deleteCart = async (req, res) => {
    const { id_cart } = req.params;

    const [findCart] = await cartModel.findCart(id_cart);
    if (findCart.length === 0) {
        res.status(404).json({
            message: `Data dengan id_cart ${id_cart} tidak ditemukan !`
        })
        return false;
    }

    try {
        await cartModel.deleteCart(id_cart);
        res.status(201).json({
            message: `Data dengan id_cart ${id_cart} berhasil dihapus !`
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            serverMessage: err
        })
    }
}

module.exports = { getAllCarts, addCart, deleteCart, updateKuantitas };