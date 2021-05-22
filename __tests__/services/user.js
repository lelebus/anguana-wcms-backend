const userData = require('../../src/services/user')
const db = require('../../src/data-access/index')

const exampleUser = {
    phone: '+000',
    password: 'password',
    details: {
        name: 'name',
        surname: 'surname',
        address: 'address'
    }
}

beforeEach(async () => {
    await db.query('DELETE FROM order_details', [])
    await db.query('DELETE FROM orders', [])
    await db.query('DELETE FROM users', [])
        .catch(e => {
            console.error(e)
        })
})

describe("Get user by id", () => {
    test("it should return the data of the user", async () => {
        let user = await userData.create({ phone: exampleUser.phone });

        let newUser = await userData.get({ id: user.id })
        expect(newUser.phoneNumber).toBe(exampleUser.phone)
    });
});

describe("Get user by phone", () => {
    test("it should return the data of the user", async () => {
        let user = await userData.create({ phone: exampleUser.phone });

        let newUser = await userData.get({ phone: exampleUser.phone })
        expect(newUser.id).toBe(user.id)
    });
});

describe("Update user details", () => {
    test("it should return the updated data", async () => {
        let user = await userData.create({ phone: exampleUser.phone });

        await userData.updateDetails(user.id, exampleUser.details.name, exampleUser.details.surname, exampleUser.details.address)

        let newUser = await userData.get({ id: user.id })
        expect(newUser.name).toBe(exampleUser.details.name)
    });
});

describe("Update user password", () => {
    test("it should return the updated data", async () => {
        let user = await userData.create({ phone: exampleUser.phone });

        await userData.updateLogin(user.id, exampleUser.password)

        let newUser = await userData.get({ id: user.id })
        expect(newUser.password).toBe(exampleUser.password)
    });
});

