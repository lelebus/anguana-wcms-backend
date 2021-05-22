const settingsData = require('../data-access/settings')

module.exports = {
    getDeliveryTiming: async () => {
        let timing
        try {
            timing = await settingsData.get("delivery-timing")
        } catch (e) {
            throw e;
        }

        if (timing == null) {
            throw new error("This setting do not exist")
        }

        return timing;
    },
    setDeliveryTiming: async (values) => {
        values.deliverySlotsDuration = 120 // PRE-VERSION
        values.ordersPerSlot = 10 // PRE-VERSION
        try {
            return await settingsData.set("delivery-timing", values)
        } catch (e) {
            throw e;
        }
    }
}