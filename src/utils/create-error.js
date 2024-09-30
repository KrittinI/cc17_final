const createError = (statusCode, message) => {
    return res.status(statusCode).json({ message: message });
};

module.exports = createError;
