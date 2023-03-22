require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');

const app = express();

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');

app.use('/assets/', express.static('public/images'));
app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

app.use('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload berhasil'
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`express-mysql is running at http://127.0.0.1:${PORT}`);
})