const { accessSecret, refreshSecret } = require('../config/index');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const userService = require('./user')
const notification = require('./notification')
const userData = require('../data-access/users')

module.exports = {

    createTokens: (user) => {
        const accessToken = sign({ userId: user.id, userRole: user.permissions }, accessSecret, { expiresIn: "15min" });
        const refreshToken = sign({ userId: user.id, userRole: user.permissions, count: user.resetcount }, refreshSecret, { expiresIn: "90d" });
        return { accessToken, refreshToken };
    },

    getToken: async (phone) => {
        let passwordToken = generateToken(6)

        let user
        try {
            user = await userService.get({ phone })
            if (user == null || user.role == 'ADMIN') {
                return false;
            }
        } catch (e) {
            throw e;
        }

        try {
            await bcrypt.hash(passwordToken, 10)
                .then(async (hash) => {
                    await userService.updateLogin(user.id, hash)
                })
                .catch(e => {
                    throw e;
                })
        } catch (e) {
            throw e;
        }

        return await notification.sendToken(phone, user.language, passwordToken)
            .then(res => {
                return res;
            })
    },

    registerAdmin: async (email, password, name, surname, language) => {
        let details = {
            name,
            surname,
            address: '',
            language
        }
        try {
            await bcrypt.hash(password, 10)
                .then(async (hash) => {
                    await userData.newLogin(email, hash, 'ADMIN', details)
                })
                .catch(e => {
                    throw e;
                })
            return true;
        } catch (e) {
            throw e;
        }
    },

    login: async ({ email, phone, password }) => {
        let user
        try {
            user = await userService.get({ email, phone })
        } catch (e) {
            throw e;
        }

        if (user == null) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }

        return user;
    }
}

function generateToken(digits) {
    let token = ''
    for (i = 0; i < digits; i++) {
        token += Math.floor((Math.random() * 10))
    }

    return token;
}