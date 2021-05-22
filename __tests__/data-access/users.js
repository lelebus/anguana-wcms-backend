const db = require('../../src/data-access/index')
const userData = require('../../src/data-access/users')
const bcrypt = require('bcryptjs');

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
            console.log(e)
            throw e;
        })
})

describe("Get user by id", () => {
    test("it should return the data of the user", async () => {
        let id = await userData.new(exampleUser.phone, exampleUser.details);

        let newUser = await userData.getById(id)
        expect(newUser.phoneNumber).toBe(exampleUser.phone)
    });
});

describe("Get user by phone", () => {
    test("it should return the data of the user", async () => {
        let id = await userData.new(exampleUser.phone, exampleUser.details);

        let newUser = await userData.getByPhone(exampleUser.phone)
        expect(newUser.id).toBe(id)
    });
});

describe("Update user details", () => {
    test("it should return the updated data", async () => {
        let id = await userData.new(exampleUser.phone, exampleUser.details);

        await userData.updateDetails(id, exampleUser.details)

        let newUser = await userData.getByPhone(exampleUser.phone)
        expect(newUser.name).toBe(exampleUser.details.name)
    });
});

describe("Update user password", () => {
    test("it should updated user's password for login", async () => {
        let id = await userData.new(exampleUser.phone, exampleUser.details);

        await userData.updateLogin(id, exampleUser.password)

        let newUser = await userData.getByPhone(exampleUser.phone)
        expect(newUser.password).toBe(exampleUser.password)
    });
});

describe("Add new user", () => {
    test("it should return the id of the inserted admin", async () => {
        let details = {
            language: 'IT'
        }
        await expect(userData.newLogin("test@test.test", "password", {}, details)).resolves.toHaveLength(32);
    });
});

