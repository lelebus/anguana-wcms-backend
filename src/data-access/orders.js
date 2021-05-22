const db = require('./index');
require('array-foreach-async');

module.exports = {

    getById: async (id, userId) => {
        let query = `SELECT id, customer, price, status, createdon, deliveryDate, deliverySlot, notes FROM orders WHERE id = $1`
        let args = [id]
        if (userId) {
            query += ` AND customer = $2`
            args.push(userId)
        }

        let row = await db.query(query, args)
            .then(res => {
                return res.rows[0];
            })
            .catch(e => {
                console.log(e)
                throw e;
            })
        if (!row) {
            return null;
        }

        try {
            return parseOrder(row);
        } catch (e) {
            console.log(e)
        }
    },

    getByDeliveryDate: async (date) => {
        let query = `SELECT id, customer, price, status, createdon, deliveryDate, deliverySlot, notes FROM orders WHERE deliveryDate = $1`
        let args = [date]

        let rows = await db.query(query, args)
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })

        let orders = []
        rows.forEach(row => {
            orders.push(parseOrder(row))
        });

        return orders;
    },

    getAll: async (userId) => {
        let query = `SELECT id, customer, price, status, createdOn, deliveryDate, deliverySlot, notes FROM orders`
        let args = []
        if (userId) {
            query += ` WHERE customer = $1`
            args.push(userId)
        }
        query += ' ORDER BY createdon DESC'

        let rows = await db.query(query, args)
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })

        let orders = []
        rows.forEach(row => {
            orders.push(parseOrder(row))
        });

        return orders;
    },

    getOrderProducts: async (id) => {
        let query = `SELECT product, quantity, price FROM order_details WHERE order_id = $1`
        let args = [id]

        let rows = await db.query(query, args)
            .then(res => {
                return res.rows;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })

        let products = []
        rows.forEach(product => {
            product.productId = product.product
            delete product['product']
            product.measuredPrice = product.price
            delete product['price']

            products.push(product)
        })

        return products;
    },

    updateDetails: async (id, { deliveryDate, deliverySlot, measuredPrice, status }) => {
        let query = `UPDATE orders SET price = $1, status = $2, deliveryDate = $3, deliverySlot = $4, last_updated = CURRENT_TIMESTAMP WHERE id = $5`
        let args = [measuredPrice, status, deliveryDate, deliverySlot, id]
        return await db.query(query, args)
            .then(() => {
                return true;
            })
            .catch(e => {
                console.log(e)
                throw e;
            })
    },

    updateProducts: async (id, products) => {
        const client = await db.getClient()
        try {
            await client.query('BEGIN')

            let query = 'DELETE FROM order_details WHERE order_id = $1'
            let args = [id]
            await client.query(query, args)

            await products.forEachAsync(async p => {
                query = 'INSERT INTO order_details (order_id, product, quantity, price) VALUES ($1, $2, $3, $4)'
                args = [id, p.productId, p.quantity, p.measuredPrice]
                await client.query(query, args)
            });

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')

            console.log('ROLLBACK operation')
            console.error(e);
            throw e;
        } finally {
            client.release();
        }
    },

    new: async (customer, creator, deliveryDate, deliverySlot, notes, price) => {
        console.log(notes)
        let query = `INSERT INTO orders (customer, deliveryDate, deliverySlot, createdBy, notes, price, status, last_updated) VALUES ( $1, $2, $3, $4, $5, $6, '{"status": "SUBMITTED"}', CURRENT_TIMESTAMP ) RETURNING id`
        let args = [customer, deliveryDate, deliverySlot, creator, notes, price]
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

function parseOrder(row) {
    let order = row
    order.measuredPrice = row.price
    delete row['price']

    order.prepared = order.status.prepared
    order.shipped = order.status.shipped
    order.delivered = order.status.delivered
    order.paid = order.status.paid
    order.status = order.status.status

    let deliverySlot = new Date(order.deliverydate)
    order.timeSlot = order.deliveryslot
    order.timeSlot.day = {
        date: deliverySlot.getDate(),
        month: deliverySlot.getMonth(),
        year: deliverySlot.getFullYear()
    }

    order.submissionDate = row.createdon
    order.byUser = row.customer

    return order;
}