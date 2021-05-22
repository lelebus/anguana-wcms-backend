const settingsData = require('../../src/data-access/settings')

const exampleSetting = {
    field: "field value"
}

describe("Get new setting", () => {
    test("it should return the inserted setting", async () => {
        let exampleKey = "exampleSetting"
        await settingsData.set(exampleKey, exampleSetting)

        let row = await settingsData.get(exampleKey)
        expect(row).toMatchObject(exampleSetting);
    });
});