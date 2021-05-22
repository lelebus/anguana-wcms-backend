const db = require('../../src/data-access/index')
const userData = require('../../src/data-access/users')
const productData = require('../../src/data-access/products')
const orderService = require('../../src/services/order')

const exampleSlot = {
    day: {
        date: 11,
        month: 11,
        year: 2011
    },
    time: {
        startTime: '17:00',
        endTime: '17:30'
    }
}


const exampleUser = {
    phone: '+000',
    password: 'password',
    details: {
        name: 'name',
        surname: 'surname',
        address: 'address'
    }
}

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
    price: 9.00,
    imageUrl: null,
    isVisible: false
}

beforeEach(async () => {
    await db.query('DELETE FROM order_details', [])
    await db.query('DELETE FROM orders', [])
    await db.query('DELETE FROM users', [])
        .catch(e => {
            console.log(e)
        })
})

describe("Update order details", () => {
    test("it should return the order with the updated field", async () => {
        // create product
        let parentId = await productData.new(exampleProduct);
        let newProductModel = exampleProductModel
        newProductModel.parent = parentId
        let id = await productData.newModel(newProductModel)
        let productOrderInput = {
            productId: id,
            quantity: 8,
            measuredPrice: 90.00
        }

        // create user
        let userId = await userData.new(exampleUser.phone, exampleUser.details);
        let order = await orderService.new(userId, userId, [productOrderInput], exampleSlot);

        await expect(orderService.getOrderProducts(order.id)).resolves.toContainEqual(productOrderInput)
        expect(order.status).toBe('SUBMITTED')
    });
});

