const logRequest = (req, res, next) => {
    console.log('Terjadi Request ke PATH', req.path);
    next();
}

module.exports = logRequest;