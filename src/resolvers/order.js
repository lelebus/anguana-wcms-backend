const orderService = require('../services/order');
const { ForbiddenError, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        getOrder: async (_, { orderId }, { req }) => {
            let userId
            if (req.userRole != 'ADMIN') {
                userId = req.userId
            }

            return await orderService.get(orderId, userId)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getOrders: async (_, __, { req }) => {
            let userId
            if (req.userRole != 'ADMIN') {
                userId = req.userId
            }

            return await orderService.getAll(userId)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getUserOrders: async (_, { userId }, { req }) => {
            if (req.userRole != 'ADMIN' && req.userId != userId) {
                throw new ForbiddenError
            }

            return await orderService.getAll(userId)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getBookedTimeSlots: async (_, { days }, __) => {
            return await orderService.getBookedTimeslots(days)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    },

    Order: {
        products: async (parent) => {
            return await orderService.getOrderProducts(parent.id)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    },

    Mutation: {
        setOrder: async (_, { order }, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            return await orderService.updateData(order.id, order)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        declineOrder: async (_, { orderId }, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError();
            }

            return await orderService.decline(orderId)
                .then(() => {
                    return 'REFUSED';
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        addOrder: async (_, { products, timeSlot, notes }, { req }) => {
            return await orderService.new(req.userId, req.userId, products, timeSlot, notes)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    }
}

