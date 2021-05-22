const db = require('../../src/data-access/index')
const productData = require('../../src/data-access/products')
const userData = require('../../src/data-access/users')
const orderData = require('../../src/data-access/orders')

const exampleSlot = {
    date: new Date(2011, 11, 11),
    time: {
        startTime: '17:00',
        endTime: '17:30'
    }
}

const exampleStatus = {
    status: 'PREPARED',
    prepared: true,
    shipped: false,
    paid: false
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
    imageUrl: null,
    price: 9.00,
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

describe("Add new order", () => {
    test("it should return the id of the inserted order", async () => {
        let userId = await userData.new(exampleUser.phone);
        await expect(orderData.new(userId, userId, exampleSlot.date, exampleSlot.time)).resolves.toHaveLength(32);
    });
});

describe("Get order by id", () => {
    test("it should return the created order by userId", async () => {
        let price = 80.90
        let userId = await userData.new(exampleUser.phone);
        let orderId = await orderData.new(userId, userId, exampleSlot.date, exampleSlot.time);

        await expect(orderData.getById(orderId, userId)).resolves.not.toBeNull();
    });
    test("it should NOT return the created order by a casual userId", async () => {
        let price = 80.90
        let userId = await userData.new(exampleUser.phone);
        let orderId = await orderData.new(userId, userId, exampleSlot.date, exampleSlot.time);

        await expect(orderData.getById(orderId, 'casual id')).resolves.toBeNull();
    });
});

describe("Update order details", () => {
    test("it should return the order with the updated field", async () => {
        let userId = await userData.new(exampleUser.phone);
        let orderId = await orderData.new(userId, userId, exampleSlot.date, exampleSlot.time);

        let newOrder = await orderData.getById(orderId)
        let price = 85.90
        newOrder.measuredPrice = price
        newOrder.status = exampleStatus.status
        newOrder.prepared = exampleStatus.prepared
        newOrder.shipped = exampleStatus.shipped
        newOrder.paid = exampleStatus.paid


        await expect(orderData.updateDetails(orderId, { deliveryDate: exampleSlot.date, deliverySlot: exampleSlot.time, measuredPrice: price, status: exampleStatus })).resolves.toBe(true)
        await expect(orderData.getById(orderId)).resolves.toMatchObject(newOrder)
    });
});

describe("Update order products", () => {
    test("it should return the inserted products for the order", async () => {
        // create product
        let parentId = await productData.new(exampleProduct);
        let newProductModel = exampleProductModel
        newProductModel.parent = parentId
        let id = await productData.newModel(newProductModel)
        let productOrderInput = {
            productId: id,
            quantity: 8.9,
            measuredPrice: 90.0
        }

        // create user
        let userId = await userData.new(exampleUser.phone, exampleUser.details);

        let orderId = await orderData.new(userId, userId, exampleSlot.date, exampleSlot.time, 80.90);

        await orderData.updateProducts(orderId, [productOrderInput])

        await expect(orderData.getOrderProducts(orderId)).resolves.toContainEqual(productOrderInput)
    });
});