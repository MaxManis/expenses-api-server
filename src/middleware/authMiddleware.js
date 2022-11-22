const jwt = require('../services/jwtService');

function authMiddleware(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        res.sendStatus(401);

        return;
    }

    const user = jwt.validateAccessToken(token);

    if (!user) {
        res.sendStatus(401);

        return;
    }

    next();
}

module.exports = {
    authMiddleware,
};
