const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalname = file.originalname;
        cb(null, `${timestamp}-${originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


module.exports = { fileStorage, fileFilter };