const db = require('../../src/data-access/index')
const productData = require('../../src/data-access/products')

const exampleProduct = {
    name: "name",
    description: "description",
    avgPrice: 9.89,
    type: "FRUIT",
    imageUrl: null,
    isVisible: false
}

const exampleProductModel = {
    name: "name",
    description: "description",
    origin: "origin",
    preferences: {
        isBio: true
    },
    imageUrl: null,
    price: 9.00,
    isVisible: false
}

beforeEach(async () => {
    await db.query('DELETE FROM order_details', [])
        .catch(e => {
            console.error(e)
            throw e;
        })
})

describe("Add new product", () => {
    test("it should return the id of the inserted product", async () => {
        await expect(productData.new(exampleProduct)).resolves.toHaveLength(32);
    });
});

describe("Add new product model", () => {
    test("it should return the id of the inserted product model", async () => {
        let parentId = await productData.new(exampleProduct);
        let newProductModel = exampleProductModel
        newProductModel.parent = parentId

        await expect(productData.newModel(newProductModel)).resolves.toHaveLength(32)
    });
});

describe("Get product by id", () => {
    test("it should return the id of the public inserted product", async () => {
        let id = await productData.new(exampleProduct);

        await expect(productData.getById(id, true)).resolves.toMatchObject(exampleProduct)
    });
    test("it should NOT return the id of the NOT public product", async () => {
        let id = await productData.new(exampleProduct);

        await expect(productData.getById(id, false)).resolves.toBeNull()
    });
});

describe("Get all parent products", () => {
    test("it should return a list, containing the inserted product", async () => {
        let id = await productData.new(exampleProduct);
        let newProduct = exampleProduct
        newProduct.id = id

        await expect(productData.getAllParents({}, true)).resolves.toContainEqual(newProduct)
    });
    test("it should return a list of products with given type, containing the inserted product", async () => {
        let id = await productData.new(exampleProduct);
        let newProduct = exampleProduct
        newProduct.id = id

        await expect(productData.getAllParents({ type: newProduct.type }, true)).resolves.toContainEqual(newProduct)
    });
});

describe("Get product by parent", () => {
    test("it should return a list of product models, containing the new inserted one", async () => {
        let parentId = await productData.new(exampleProduct);
        let newProductModel = exampleProductModel
        newProductModel.parent = parentId

        let id = await productData.newModel(newProductModel)
        newProductModel.id = id
        delete newProductModel.parent
        newProductModel.productId = parentId

        await expect(productData.getByParent(parentId, true)).resolves.toContainEqual(newProductModel)
    });
});

describe("Update product details", () => {
    test("it should return the the product with the updated field", async () => {
        let newProduct = exampleProduct
        let id = await productData.new(newProduct);
        newProduct.id = id
        await expect(productData.getById(id, true)).resolves.toMatchObject(newProduct)

        newProduct.name = 'new name'
        await expect(productData.updateDetails(id, newProduct)).resolves.toBe(true)
        await expect(productData.getById(id, true)).resolves.toMatchObject(newProduct)
    });
    test("it should return the the product model with the updated field", async () => {
        let parentId = await productData.new(exampleProduct);
        let newProductModel = exampleProductModel
        newProductModel.parent = parentId

        let id = await productData.newModel(newProductModel)
        newProductModel.id = id
        delete newProductModel.parent
        newProductModel.productId = parentId
        await expect(productData.getById(id, true)).resolves.toMatchObject(newProductModel)

        newProductModel.name = 'new name'
        await expect(productData.updateModelDetails(id, parentId, newProductModel)).resolves.toBe(true)
        await expect(productData.getById(id, true)).resolves.toMatchObject(newProductModel)
    });
});