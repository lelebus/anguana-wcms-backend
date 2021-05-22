const db = require('./index')

module.exports = {
    getTemplate: async (key, language) => {
        let query = `SELECT text FROM notifications WHERE key = $1 AND language = $2`
        return await db.query(query, [key, language])
            .then(res => {
                return res.rows[0].text;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })
    }
}