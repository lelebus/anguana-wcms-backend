const productService = require('../../src/services/product')
const productModelService = require('../../src/services/product-model')
require('array-foreach-async');

const exampleProduct = {
    name: "name",
    description: "description",
    avgPrice: 9.89,
    type: "FRUIT",
    imageUrl: null,
    isVisible: false
}

describe("Get all products", () => {
    test("it should return the inserted public product", async () => {
        let productId = await productService.new(exampleProduct)
        let newProduct = exampleProduct
        newProduct.id = productId
        
        await expect(productService.getAll(null, true)).resolves.toContainEqual(newProduct)
    });
    test("it should NOT return the inserted NOT public product", async () => {
        let productId = await productService.new(exampleProduct)
        let newProduct = exampleProduct
        newProduct.id = productId
        
        await expect(productService.getAll(null, false)).resolves.not.toContainEqual(newProduct)
    });
});

describe("Update product data", () => {
    test("it should return the product with the updated field", async () => {
        let productId = await productService.new(exampleProduct)
        let newProduct = exampleProduct
        newProduct.id = productId
        newProduct.name = 'new name'
        
        await productService.updateData(productId, { name: newProduct.name })
        await expect(productService.get(productId, true)).resolves.toMatchObject(newProduct)
    });
});


const exampleProductModel = {
    name: "name",
    description: "description",
    origin: "origin",
    preferences: {
        isBio: true
    },
    price: 9.00,
    imageUrl: null,
    isVisible: false
}

describe("Get all models by parent product", () => {
    test("it should return the inserted public product model", async () => {
        let parentId = await productService.new(exampleProduct)

        let newProduct = exampleProductModel
        newProduct.productId = parentId
        let productId = await productModelService.new(exampleProductModel)
        newProduct.id = productId
        
        await expect(productModelService.getByProduct(parentId, true)).resolves.toContainEqual(newProduct)
    });
    test("it should NOT return the inserted NOT public product model", async () => {
        let parentId = await productService.new(exampleProduct)

        let newProduct = exampleProductModel
        newProduct.imageUrl = null;
        newProduct.productId = parentId
        let productId = await productModelService.new(exampleProductModel)
        newProduct.id = productId
        
        await expect(productModelService.getByProduct(parentId, true)).resolves.toContainEqual(newProduct)
    });
});

describe("Update product model data", () => {
    test("it should return the product model with the updated field", async () => {
        let parentId = await productService.new(exampleProduct)

        let newProduct = exampleProductModel
        newProduct.productId = parentId

        let productId = await productModelService.new(newProduct)
        newProduct.id = productId
        newProduct.name = 'new name'
        
        await productModelService.updateData(productId, { name: newProduct.name })
        await expect(productModelService.get(productId, true)).resolves.toContainEqual(newProduct)
    });
});

