const dbPool = require('./../config/database');

const getAllProducts = () => {
    const SQLQuery = "SELECT * FROM products JOIN kategori ON products.id_kategori=kategori.id_kategori";

    return dbPool.execute(SQLQuery);
}

const findById = (id) => {
    const SQLQuery = `SELECT * FROM products WHERE id_product='${id}'`;
    return dbPool.execute(SQLQuery);
}

const addProduct = (body, image) => {

    const SQLQuery = `INSERT INTO products VALUES (null,'${body.nama_product}', '${body.deskripsi}', '${body.harga}', '${image}', '${body.id_kategori}')`;

    return dbPool.execute(SQLQuery);
}

const updateProduct = (body, id_product, image) => {
    const SQLQuery = `  UPDATE products SET 
                        nama_product='${body.nama_product}',
                        deskripsi='${body.deskripsi}', 
                        harga='${body.harga}',
                        gambar_product='${image}' WHERE id_product='${id_product}'`;

    return dbPool.execute(SQLQuery);
}

const deleteProduct = (id_product) => {
    const SQLQuery = `DELETE FROM products WHERE id_product='${id_product}'`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    findById
}