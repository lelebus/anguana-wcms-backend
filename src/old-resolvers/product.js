const product = require('../services/product');
const { ForbiddenError, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        getProduct: async (_, { productId }, { req }) => {
            let includeHidden = true
            if (req.userRole != 'ADMIN') {
                includeHidden = false;
            }

            return await product.get(productId, includeHidden)
                .then(res => {
                    // TODO: throw not found
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getProducts: async (_, { type, includeHidden }, { req }) => {
            if (includeHidden == true && req.userRole != 'ADMIN') {
                includeHidden = false;
            }

            return await product.getAll(type, includeHidden)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    },
    Mutation: {
        setProduct: async (_, args, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError;
            }

            let productInput = args.product

            if (productInput.id) {
                return await product.updateData(productInput.id, productInput)
                    .then(() => {
                        return productInput.id
                    })
                    .catch(err => {
                        throw new ApolloError(err)
                    })
            }

            return await product.new(productInput)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        setProductField: async (_, args, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            return await product.updateData(args.id, args)
                .then(() => {
                    return true;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    }
}