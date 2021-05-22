const notification = require('../services/notification')
const settings = require('../data-access/settings')
const orderData = require('../data-access/orders')
const userData = require('../data-access/users')

module.exports = {

    get: async (id, userId) => {
        try {
            return await orderData.getById(id, userId)
        } catch (e) {
            throw e;
        }
    },

    getAll: async (userId) => {
        try {
            return await orderData.getAll(userId)
        } catch (e) {
            throw e;
        }
    },

    getOrderProducts: async (id) => {
        try {
            return await orderData.getOrderProducts(id)
        } catch (e) {
            throw e;
        }
    },

    getBookedTimeslots: async (days) => {
        let threshold = await settings.get('delivery-timing')
            .then(res => {
                return res.ordersPerSlot
            })
        let bookedSlots = []

        let slots = new Map()
        await days.forEachAsync(async date => {
            date = new Date(date.year, date.month, date.date)
            let orders = await orderData.getByDeliveryDate(date)

            orders.forEach(order => {
                let slot = JSON.stringify(order.timeSlot)
                let count = slots.get(slot)
                if (!count) {
                    count = 0
                }
                slots.set(slot, ++count)
            })
        })

        slots.forEach((value, key) => {
            if (value >= threshold) {
                bookedSlots.push(JSON.parse(key))
            }
        })

        return bookedSlots;
    },

    updateData: async (id, { measuredPrice, products, timeSlot, prepared, shipped, delivered, paid }) => {
        let order, user
        let wasPrepared = false
        try {
            order = await orderData.getById(id)
            wasPrepared = order.prepared

            user = await userData.getById(order.customer)
        } catch (e) {
            throw e;
        }

        if (measuredPrice) {
            order.measuredPrice = measuredPrice
        }
        if (products) {
            try {
                await orderData.updateProducts(id, products)
            } catch (e) {
                throw e;
            }
        }
        if (timeSlot) {
            let date = timeSlot.day
            order.deliveryDate = new Date(date.year, date.month, date.date)
            order.deliverySlot = {
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime
            }
        }

        let status = order.status
        if (prepared != null || shipped != null || delivered != null || paid != null) {
            status = 'SUBMITTED'
            if (prepared == true) {
                status = 'PREPARED'
            }
            if (shipped == true) {
                status = 'SHIPPED'
            }
            if (delivered == true) {
                status = 'DELIVERED'
            }
            if (paid == true) {
                status = 'CLOSED'
            }

        }
        order.status = {
            status,
            prepared,
            shipped,
            delivered,
            paid
        }

        if (wasPrepared != true && order.status.prepared == true) {
            let startTime = notification.padNumber(order.deliverySlot.startTime.hours, 2) + ":" + notification.padNumber(order.deliverySlot.startTime.minutes, 2)
            let endTime = notification.padNumber(order.deliverySlot.endTime.hours, 2) + ":" + notification.padNumber(order.deliverySlot.endTime.minutes, 2)
            notification.sendShippingDetails(user.phoneNumber, user.language, user.name, order.measuredPrice, order.deliveryDate, startTime, endTime)
        }

        await orderData.updateDetails(id, order)
        return order.status.status;
    },

    decline: async (id) => {
        let order
        try {
            order = await orderData.getById(id)
        } catch (e) {
            throw e;
        }

        order.status = {
            status: 'REFUSED',
        }
        await orderData.updateDetails(id, order)
        return true;
    },

    new: async (customer, creator, products, timeSlot, notes) => {
        let date = timeSlot.day
        let deliveryDate = new Date(date.year, date.month, date.date)
        let deliverySlot = {
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime
        }

        let order
        try {
            let orderId = await orderData.new(customer, creator, deliveryDate, deliverySlot, notes)
            await orderData.updateProducts(orderId, products)
            order = await orderData.getById(orderId)
        } catch (e) {
            throw e;
        }

        return order;
    }

}