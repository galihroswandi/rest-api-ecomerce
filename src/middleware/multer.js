const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;
        cb(null, `${timestamp}-${originalname}`);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1000 * 1000 // 5MB
    }
});

module.exports = upload;