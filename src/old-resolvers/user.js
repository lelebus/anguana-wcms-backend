const userService = require('../services/user');
const auth = require('../services/auth')
const { ForbiddenError, ApolloError, AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        getUser: async (_, { userId }, { req }) => {
            if (req.userRole != 'ADMIN' && req.userId != userId) {
                throw new ForbiddenError();
            }

            return await userService.get({ id: userId })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getUsers: async (_, __, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError();
            }

            return await userService.getAll()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getCurrentUser: async (_, __, { req }) => {
            return await userService.get({ id: req.userId })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        existsUser: async (_, { countryCode, phone }) => {
            phone = phone.replace(/ /g, '')
            return await userService.get({ phone: countryCode + phone })
                .then(res => {
                    if (res == null) {
                        return false;
                    }
                    return true;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    },
    Mutation: {
        registerUser: async (_, { countryCode, phone, language }, { res }) => {
            phone = phone.replace(/ /g, '')
            let user = await userService.create({ phone: countryCode + phone }, language)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })

            const { accessToken, refreshToken } = auth.createTokens(user)
            res.cookie('access-token', accessToken, { maxAge: 900000 });
            res.cookie('refresh-token', refreshToken, { httpOnly: true, maxAge: (90 * 86400000) });

            return user;
        },
        sendUserVerificationToken: async (_, { countryCode, phone }) => {
            phone = phone.replace(/ /g, '')
            phone = countryCode + phone
            return await auth.getToken(phone)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        loginUser: async (_, { countryCode, phone, token }, { res }) => {
            phone = phone.replace(/ /g, '')
            let user = await auth.login({ phone: countryCode + phone, password: token })
                .then(res => {
                    console.log(res)
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
            if (user == null) {
                throw new AuthenticationError("Wrong credentials");
            }

            const { accessToken, refreshToken } = auth.createTokens(user)
            res.cookie('access-token', accessToken, { httpOnly: true, maxAge: 900000 });
            res.cookie('refresh-token', refreshToken, { httpOnly: true, maxAge: (90 * 86400000) });

            return user;
        },
        registerAdmin: async (_, { email, password, name, surname, language }, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError;
            }

            return await auth.registerAdmin(email.toLowerCase(), password, name, surname, language)
                .then(res => {
                    return true;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        loginAdmin: async (_, { email, password }, { res }) => {
            let user = await auth.login({ email: email.toLowerCase(), password })
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
            if (user == null) {
                throw new AuthenticationError("Wrong credentials")
            }

            const { accessToken, refreshToken } = auth.createTokens(user)
            res.cookie('access-token', accessToken, { httpOnly: true, maxAge: 900000 });
            res.cookie('refresh-token', refreshToken, { httpOnly: true, maxAge: (90 * 86400000) });

            return user;
        },
        setUserData: async (_, { userId, name, surname, language, address }, { req }) => {
            if (req.userRole != 'ADMIN' && req.userId != userId) {
                throw new ForbiddenError;
            }

            return await userService.updateDetails(userId, name, surname, address, language)
                .then(() => {
                    return true;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        logout: async (_, __, { res }) => {
            res.clearCookie('access-token')
            res.clearCookie('refresh-token')

            return true;
        }
    }
}