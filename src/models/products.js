const dbPool = require('./../config/database');

const getAllProducts = () => {
    const SQLQuery = "SELECT * FROM products";

    return dbPool.execute(SQLQuery);
}

const addProduct = (body) => {
    const SQLQuery = `  INSERT INTO products (nama_product, deskripsi, harga, gambar) 
                        VALUES ('${body.nama_product}', '${body.deskripsi}', '${body.harga}', '${body.gambar}')`;

    return dbPool.execute(SQLQuery);
}

const updateProduct = (body, id_product) => {
    const SQLQuery = `  UPDATE products SET 
                        nama_product='${body.nama_product}',
                        deskripsi='${body.deskripsi}',
                        harga='${body.harga}',
                        gambar='${body.gambar}' WHERE id_product='${id_product}'`;

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
    deleteProduct
}