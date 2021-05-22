const db = require('./index')

module.exports = {
    getById: async (id) => {
        let query = `SELECT id, role, email, phone, password, resetcount, details FROM users WHERE id = $1`
        let args = [id]

        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                throw e;
            })
        if (row == null) {
            return null;
        }

        return parseDetails(row);
    },
    getByEmail: async (email) => {
        let query = `SELECT id, role, email, phone, password, resetcount, details FROM users WHERE email = $1`
        let args = [email]

        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                throw e;
            })
        if (row == null) {
            return null;
        }

        return parseDetails(row);
    },
    getByPhone: async (phone) => {
        let query = `SELECT id, role, email, phone, password, resetcount, details FROM users WHERE phone = $1`
        let args = [phone]

        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                throw e;
            })
        if (row == null) {
            return null;
        }

        return parseDetails(row);
    },
    getAll: async () => {
        let query = `SELECT id, role, email, phone, password, resetcount, details FROM users`

        let rows = await db.query(query, [])
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                throw e;
            })
        if (rows == []) {
            return [];
        }

        let users = []
        rows.forEach(user => {
            users.push(parseDetails(user))
        });

        return users;
    },
    updateLogin: async (id, password) => {
        let query = `UPDATE users SET password = $1, resetcount = resetcount + 1 WHERE id = $2`
        let args = [password, id]
        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                throw e;
            })
    },
    updateDetails: async (id, details) => {
        let query = `UPDATE users SET details = $1 WHERE id = $2`
        let args = [details, id]
        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })
    },
    new: async (phone, details) => {
        let query = `INSERT INTO users (phone, details) VALUES ($1, $2) RETURNING id`
        let args = [phone, details]
        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                console.error(e)
                throw e;
            })

        if (row == null) {
            return null;
        }

        return row.id
    },
    newLogin: async (email, password, role, details) => {
        let query = `INSERT INTO users (email, password, role, details) VALUES ($1, $2, $3, $4) RETURNING id`
        let args = [email, password, role, details]
        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                console.error(e)
                throw e;
            })

        if (row == null) {
            return null;
        }

        return row.id
    }
}

function parseDetails(row) {
    let user = row.details
    if (user == null) {
        return null
    }
    
    user.id = row.id

    user.permissions = row.role
    user.email = row.email
    user.phoneNumber = row.phone
    user.password = row.password
    user.resetcount = row.resetcount

    return user;
}