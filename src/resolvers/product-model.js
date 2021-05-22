const productModel = require('../services/product-model')
const { ForbiddenError, ApolloError } = require('apollo-server');

module.exports = {
    Query: {
        getProductModels: async (_, { productId, includeHidden }, { req }) => {
            if (includeHidden == true && req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            if (!productId) {
                return await productModel.getAll(includeHidden)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
            }

            return await productModel.getByProduct(productId, includeHidden)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getProductModelsDetails: async (_, { modelsIds }, { req }) => {
            let includeHidden = true
            if (req.userRole != 'ADMIN') {
                includeHidden = false
            }

            return await productModel.get(modelsIds, includeHidden)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        getProductModelDetails: async (_, { modelId }, { req }) => {
            let includeHidden = true
            if (req.userRole != 'ADMIN') {
                includeHidden = false
            }

            return await productModel.get(modelId, includeHidden)
                .then(res => {
                    return res[0];
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    },

    ProductModel: {
        // TODO: type? 
    },

    Mutation: {
        setProductModel: async (_, args, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            let productInput = args.model

            if (productInput.id) {
                return await productModel.updateData(productInput.id, productInput)
                    .then(() => {
                        return productInput.id
                    })
                    .catch(err => {
                        throw new ApolloError(err)
                    })
            }

            return await productModel.new(productInput)
                .then(res => {
                    return res;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        },
        setProductModelField: async (_, args, { req }) => {
            if (req.userRole != 'ADMIN') {
                throw new ForbiddenError
            }

            return await productModel.updateData(args.id, args)
                .then(() => {
                    return true;
                })
                .catch(err => {
                    throw new ApolloError(err)
                })
        }
    }
}