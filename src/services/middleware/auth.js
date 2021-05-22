
const { verify } = require('jsonwebtoken');
const { accessSecret, refreshSecret } = require('@config/index');
const { createTokens } = require("../auth");
const userService = require("@services/user");

module.exports = async (req, res, next) => {
    const accessToken = req.cookies["access-token"]
    const refreshToken = req.cookies["refresh-token"]

    if (!refreshToken && !accessToken) {
        return next();
    }

    let data;

    try {
        data = verify(accessToken, accessSecret)
        req.userId = data.userId;
        req.userRole = data.userRole;
        return next();
    } catch {
        // accessToken is not valid
    }

    if (!refreshToken) {
        return next();
    }

    try {
        data = verify(refreshToken, refreshSecret)
    } catch {
        // refreshToken is also not valid
        return next();
    }

    let user = await userService.get({ id: data.userId })
    if (user == null) {
        return next();
    }

    if (user.resetcount != data.count) {
        // someone tampered with the tokens
        return next();
    }

    // refreshToken is OK
    const newTokens = createTokens(user)
    res.cookie('access-token', newTokens.accessToken, { httpOnly: true, maxAge: 900000 });
    res.cookie('refresh-token', newTokens.refreshToken, { httpOnly: true, maxAge: (90* 86400000)});

    req.userId = user.id
    req.userRole = user.permissions
    next();
}