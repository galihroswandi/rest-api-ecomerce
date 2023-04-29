const dbPool = require('../config/database');

const getAllCart = () => {
    const SQLQuery = "SELECT * FROM cart JOIN products ON cart.id_product=products.id_product";

    return dbPool.execute(SQLQuery);
}

const findCart = (id_cart) => {
    const SQLQuery = `SELECT * FROM cart WHERE id_cart='${id_cart}'`;

    return dbPool.execute(SQLQuery);
}

const findCartByIDProduct = (id_product) => {
    const SQLQuery = `SELECT * FROM cart WHERE id_product='${id_product}'`;

    return dbPool.execute(SQLQuery);
}

const addCart = (body, totalHarga) => {
    const SQLQuery = `INSERT INTO cart VALUES(null, '${body.uid}', '${body.id_product}', '${body.kuantitas}','${totalHarga}', '1', null)`;

    return dbPool.execute(SQLQuery);
}

const updateKuantitas = (newKuantitas, totalHarga, id_cart) => {
    const SQLQuery = `UPDATE cart SET kuantitas='${newKuantitas}', total_harga='${totalHarga}' WHERE id_cart='${id_cart}'`;

    return dbPool.execute(SQLQuery);
}

const deleteCart = (id_cart) => {
    const SQLQuery = `DELETE FROM cart WHERE id_cart='${id_cart}'`;

    return dbPool.execute(SQLQuery);
}

module.exports = { getAllCart, addCart, findCart, deleteCart, findCartByIDProduct, updateKuantitas };