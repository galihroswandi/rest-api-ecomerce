const usersModel = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await usersModel.getAllUsers();
        res.json({
            message: 'GET all users success',
            data,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const createNewUser = async (req, res) => {
    const { body } = req;

    if (!body.email || !body.name || !body.password || !body.address) {
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah',
            data: null
        })
    }

    try {
        await usersModel.createNewUser(body);
        res.status(201).json({
            message: 'create new user success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateUser = async (req, res) => {
    const { id_user } = req.params;
    const { body } = req;

    try {
        await usersModel.updateUser(body, id_user);
        res.json({
            message: 'update user success',
            data: {
                id_user,
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

const deleteUser = async (req, res) => {
    const { id_user } = req.params;
    try {
        await usersModel.deleteUser(id_user);
        res.json({
            message: "DELETE data success",
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };