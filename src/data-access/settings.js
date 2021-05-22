const db = require('./index')

module.exports = {
    get: async (key) => {
        let query = `SELECT value FROM settings WHERE key = $1`
        let args = [key]

        return await db.query(query, args)
            .then(res => {
                return res.rows[0].value;
            })
            .catch(e => {
                throw e;
            })
    },

    set: async (key, value) => {
        let query = `INSERT INTO settings (key, value) VALUES ($1, $2)
                        ON CONFLICT (key) DO UPDATE SET value = $2`
        let args = [key, value]

        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                throw e;
            })
    }
}