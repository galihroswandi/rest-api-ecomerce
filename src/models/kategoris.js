const dbPool = require('../config/database');

const getAllKategoris = () => {
    const SQLQuery = "SELECT * FROM kategori";

    return dbPool.execute(SQLQuery);
}

const findById = (id) => {
    const SQLQuery = `SELECT * FROM kategori WHERE id_kategori='${id}'`;
    return dbPool.execute(SQLQuery);
}

const addKategori = (body, image) => {

    const SQLQuery = `INSERT INTO kategori VALUES (null,'${body.nama_kategori}','${image}')`;

    return dbPool.execute(SQLQuery);
}

const updateKategori = (body, id_kategori, image) => {
    const SQLQuery = `  UPDATE kategori SET 
                        nama_kategori='${body.nama_kategori}',
                        gambar_kategori='${image}' WHERE id_kategori='${id_kategori}'`;

    return dbPool.execute(SQLQuery);
}

const deleteKategori = (id_kategori) => {
    const SQLQuery = `DELETE FROM kategori WHERE id_kategori='${id_kategori}'`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllKategoris,
    addKategori,
    updateKategori,
    findById,
    deleteKategori
}