const checkoutModel = require('./../models/checkout');
const usersModel = require('./../models/users');

const getAllCheckout = async (req, res) => {

    const { id_user } = req.params;

    try {
        const [dataCheckout] = await checkoutModel.getAllCheckout(id_user);
        const [dataUser] = await usersModel.findUser(id_user);
        res.status(200).json({
            message: "Get All Checkout Success",
            data: {
                checkout: dataCheckout,
                user: dataUser
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        })
    }
}

const addCheckout = async (req, res) => {

    res.json({
        status: "Oke"
    })

    const { body } = req;

    if (!body.id_pesanan || !body.id_product || !body.kuantitas || !body.subtotal || !body.id_user) {
        res.status(400).json({
            message: "Anda mengirim data yang salah !",
            data: body
        })
        return false;
    }

    try {
        const [data] = await checkoutModel.addCheckout(body);
        res.status(201).json({
            message: "create new checkout success",
            data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        })
    }
}

const deleteCheckout = async (req, res) => {

    const { id_checkout } = req.params;

    try {
        await checkoutModel.deleteCheckout(id_checkout);
        res.status(201).json({
            message: `Delete checkout id ${id_checkout} success`,
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            serverMessage: err
        })
    }
}

module.exports = { getAllCheckout, addCheckout, deleteCheckout };