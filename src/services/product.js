const productData = require('../data-access/products')
const s3 = require('../workers/s3')

module.exports = {
    get: async (id, includeHidden) => {
        try {
            return await productData.getById(id, includeHidden)
        } catch (e) {
            throw e;
        }
    },
    getAll: async (type, includeHidden) => {
        if (includeHidden == null) {
            includeHidden = false
        }

        let products
        try {
            products = await productData.getAllParents({ type }, includeHidden)
        } catch (e) {
            throw e;
        }

        return products;
    },
    updateData: async (id, { name, description, avgPrice, type, image, isVisible }) => {
        let product
        try {
            product = await productData.getById(id)
        } catch (e) {
            throw e;
        }

        if (name) {
            product.name = name
        }
        if (description) {
            product.description = description
        }
        if (avgPrice) {
            product.avgPrice = avgPrice
        }
        if (type) {
            product.type = type
        }
        if (isVisible != null) {
            product.isVisible = isVisible
        }
        if (image) {
            uploadImage(id, image)
        }

        productData.updateDetails(id, product)

        return true;
    },
    new: async ({ name, description, avgPrice, type, image, isVisible }) => {
        let productId
        try {
            productId = await productData.new({ name, description, avgPrice, type, isVisible })
        } catch (e) {
            throw e;
        }

        uploadImage(productId, image)

        return productId;
    }
}

async function uploadImage(id, image) {
    if (image == null) {
        return;
    }

    try {
        let { createReadStream, mimetype } = await image;
        let url = await s3.uploadPublic('trettl-product-images', id + new Date().valueOf(), mimetype, createReadStream())

        await productData.updateImageUrl(id, url)
    } catch (e) {
        console.error(e)
    }
}