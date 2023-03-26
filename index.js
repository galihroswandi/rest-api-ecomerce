require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
var cors = require('cors');

const usersRoutes = require('./src/routes/users');
const productsRoutes = require('./src/routes/products');
const middlewareLogRequest = require('./src/middleware/logs');
const { fileStorage, fileFilter } = require('./src/middleware/multer');

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(middlewareLogRequest);
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`express-mysql is running at http://127.0.0.1:${PORT}`);
})