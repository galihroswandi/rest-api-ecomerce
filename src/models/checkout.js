const dbPool = require('./../config/database');

const getAllCheckout = (id_user) => {
    const SQLQuery = `SELECT * FROM checkout JOIN products ON checkout.id_product=products.id_product WHERE checkout.id_user='${id_user}'`;

    return dbPool.execute(SQLQuery);
}

const addCheckout = (body) => {
    const SQLQuery = `INSERT INTO checkout VALUES(null, '${body.id_pesanan}', '${body.id_product}', '${body.pesan}', '${body.kuantitas}', '${body.subtotal}', '${body.id_user}')`;

    return dbPool.execute(SQLQuery);
}

const deleteCheckout = (id_checkout) => {
    const SQLQuery = `DELETE FROM checkout WHERE id_checkout='${id_checkout}'`;

    return dbPool.execute(SQLQuery);
}

module.exports = { getAllCheckout, addCheckout, deleteCheckout };