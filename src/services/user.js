const userData = require('../data-access/users')

module.exports = {
    get: async ({ id, email, phone }) => {
        let user
        try {
            if (id) {
                user = await userData.getById(id)
            } else if (email) {
                user = await userData.getByEmail(email)
            } else if (phone) {
                user = await userData.getByPhone(phone)
            }
        } catch (e) {
            throw e;
        }

        if (user == null) {
            return null;
        }

        return user;
    },
    getAll: async () => {
        let users
        try {
            users = await userData.getAll()
        } catch (e) {
            throw e;
        }

        if (users == null || users == []) {
            return [];
        }

        return users;
    },
    updateLogin: async (id, password) => {
        try {
            return await userData.updateLogin(id, password)
        } catch (e) {
            throw e;
        }
    },
    updateDetails: async (id, name, surname, address, language) => {
        if (!language) {
            try {
                let user = await userData.getById(id)
                language = user.language
            } catch (e) {
                throw e;
            }
        }

        try {
            return await userData.updateDetails(id, { name, surname, address, language })
        } catch (e) {
            throw e;
        }
    },
    create: async ({ phone }, language) => {
        try {
            let details = {
                name: '',
                surname: '',
                address: '',
                language
            }
            let userId = await userData.new(phone, details)
            return await userData.getById(userId);
        } catch (e) {
            throw e;
        }
    }
}