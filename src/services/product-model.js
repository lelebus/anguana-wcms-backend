require('array-foreach-async');

const productData = require('../data-access/products')
const s3 = require('../workers/s3')

module.exports = {
    get: async (ids, includeHidden) => {
        if (!Array.isArray(ids)) {
            ids = [ids]
        }
        if (includeHidden == null) {
            includeHidden = false
        }

        let products = []
        try {
            await ids.forEachAsync(async id => {
                products.push(await productData.getById(id, includeHidden))
            })
        } catch (e) {
            throw e;
        }

        return products;
    },
    getByProduct: async (id, includeHidden) => {
        if (includeHidden == null) {
            includeHidden = false
        }

        let products
        try {
            products = await productData.getByParent(id, includeHidden)
        } catch (e) {
            throw e;
        }

        return products;
    },
    getAll: async (includeHidden) => {
        if (includeHidden == null) {
            includeHidden = false
        }

        let products
        try {
            products = await productData.getAllNonParents(includeHidden)
        } catch (e) {
            throw e;
        }

        return products;
    },
    updateData: async (id, { productId, name, description, origin, preferences, price, image, isVisible }) => {
        console.log(productId)
        let product
        try {
            product = await productData.getById(id)
            if (productId == null) {
                productId = product.productId
            }
        } catch (e) {
            throw e;
        }

        if (name) {
            product.name = name
        }
        if (description) {
            product.description = description
        }
        if (origin) {
            product.origin = origin
        }
        if (preferences) {
            product.preferences = preferences
        }
        if (price) {
            product.price = price
        }
        if (isVisible != null) {
            product.isVisible = isVisible
        }
        if (image) {
            uploadImage(id, image)
        }

        await productData.updateModelDetails(id, productId, product)

        return true;
    },
    new: async ({ productId, name, description, origin, preferences, price, image, isVisible }) => {
        let productModelId
        try {
            productModelId = await productData.newModel({ parent: productId, name, description, origin, preferences, price, isVisible })
        } catch (e) {
            throw e;
        }

        uploadImage(productModelId, image)

        return productModelId
    }
}

async function uploadImage(id, image) {
    if (image == null) {
        return;
    }

    try {
        let { createReadStream, mimetype } = await image;
        let url = await s3.uploadPublic('trettl-product-model-images', id + new Date().valueOf(), mimetype, createReadStream())

        await productData.updateImageUrl(id, url)
    } catch (e) {
        console.error(e)
    }
}