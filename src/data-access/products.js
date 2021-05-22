const db = require('./index')

module.exports = {

    getById: async (id, includeHidden) => {
        let query = `SELECT id, parent, public, details, imageurl FROM products WHERE id = $1`
        if (includeHidden == false) {
            query += ` AND public = true`
        }
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

    getByParent: async (id, includeHidden) => {
        let query = `SELECT id, parent, public, details, imageurl FROM products WHERE parent = $1`
        if (includeHidden == false) {
            query += ` AND public = true`
        }
        let args = [id]

        let rows = await db.query(query, args)
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                throw e;
            })
        if (rows == []) {
            return [];
        }

        let products = []
        rows.forEach(row => {
            products.push(parseDetails(row))
        });
        return products;
    },

    getAllParents: async ({ type }, includeHidden) => {
        let query = `SELECT id, public, details, imageurl FROM products WHERE parent IS NULL`
        let args = []
        if (type && type != null && type != "") {
            query += ` AND details->>'type' = $1`
            args.push(type)
        }
        if (includeHidden == false) {
            query += ` AND public = true`
        }

        let rows = await db.query(query, args)
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                throw e;
            })
        if (rows == []) {
            return [];
        }

        let products = []
        rows.forEach(row => {
            products.push(parseDetails(row))
        });
        return products;
    },

    getAllNonParents: async (includeHidden) => {
        let query = `SELECT id, parent, public, details, imageurl FROM products WHERE parent IS NOT NULL`
        if (includeHidden == false) {
            query += ` AND public = true`
        }

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

        let products = []
        rows.forEach(row => {
            products.push(parseDetails(row))
        });
        return products;
    },

    updateDetails: async (id, { name, description, avgPrice, type, isVisible }) => {
        let details = {
            name,
            description,
            avgPrice,
            type
        }

        let query = `UPDATE products SET details = $1, public = $2 WHERE id = $3`
        let args = [details, isVisible, id]
        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                throw e;
            })
    },

    updateModelDetails: async (id, parent, { name, description, origin, preferences, price, isVisible }) => {
        let details = {
            name,
            description,
            origin,
            preferences,
            price
        }

        let query = `UPDATE products SET parent = $1, details = $2, public = $3 WHERE id = $4`
        let args = [parent, details, isVisible, id]
        return await db.query(query, args)
            .then(() => {
                return true
            })
            .catch(e => {
                throw e;
            })
    },

    updateImageUrl: async (id, url) => {
        let query = `UPDATE products SET imageUrl = $1 WHERE id = $2`
        let args = [url, id]
        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                throw e;
            })
    },

    new: async ({ name, description, avgPrice, type, isVisible }) => {
        let details = {
            name,
            description,
            avgPrice,
            type
        }

        let query = `INSERT INTO products (details, public) VALUES ($1, $2) RETURNING id`
        let args = [details, isVisible]
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

    newModel: async ({ parent, name, description, origin, preferences, price, isVisible }) => {
        let details = {
            name,
            description,
            origin,
            preferences,
            price
        }

        let query = `INSERT INTO products (parent, details, public) VALUES ($1, $2, $3) RETURNING id`
        let args = [parent, details, isVisible]
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

        return row.id
    }

}

function parseDetails(row) {
    let product = row.details
    product.id = row.id
    product.imageUrl = row.imageurl
    product.isVisible = row.public
    if (row.parent) {
        product.productId = row.parent
    }

    return product;
}