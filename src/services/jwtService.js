const jwt = require('jsonwebtoken');
require('dotenv/config');

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET);
}

function validateAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = {
    generateAccessToken,
    validateAccessToken,
}
