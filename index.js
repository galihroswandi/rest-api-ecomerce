require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const multer = require('multer');
const path = require('path');
const { fileStorage, fileFilter } = require('./src/middleware/multer');

const app = express();
var cors = require('cors');

const usersRoutes = require('./src/routes/users');
const productsRoutes = require('./src/routes/products');
const kategorisRoutes = require('./src/routes/kategoris');
const cartRoutes = require('./src/routes/cart');
const checkoutRoutes = require('./src/routes/checkout');

app.use(multer({ storage: fileStorage, fileFilter }).single('gambar'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/kategoris', kategorisRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`express-mysql is running at http://127.0.0.1:${PORT}`);
})