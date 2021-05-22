const { getTemplate } = require('../data-access/notifications')
const notifier = require('../workers/sms')

let self = module.exports = {
    sendToken: async (phone, language, token) => {
        try {
            let template = await getTemplate('token', language)
            let values = {
                '%TOKEN%': token
            }
            let msg = createMessage(template, values)
            await notifier.sendMessage(phone, msg)
            return true;
        } catch (e) {
            return false;
        }
    },

    sendShippingDetails: async (phone, language, name, totalPrice, deliveryDate, deliveryStartTime, deliveryEndTime) => {
        let date = await createDate(deliveryDate, language)

        try {
            let template = await getTemplate('shipping_details', language)
            let values = {
                '%NAME%': name,
                '%PRICE%': totalPrice.toFixed(2),
                '%DATE%': date,
                '%STARTTIME%': deliveryStartTime,
                '%ENDTIME%': deliveryEndTime
            }
            let msg = createMessage(template, values)
            notifier.sendMessage(phone, msg)
        } catch (e) {
            console.log(e)
            return;
        }
    },

    padNumber: (num, size) => {
        num = num.toString()
        while (num.length < size) {
            num = "0" + num
        }

        return num;
    }
}

function createMessage(template, values) {
    values['%NEWLINE%'] = '\n'

    return template.replace(/%\w+%/g, function (all) {
        return values[all] || all;
    });
}

async function createDate(date, language) {
    let day

    if (isToday(date)) {
        day = 'today'
    } else if (isToday(date, 1)) {
        day = 'tomorrow'
    } else {
        switch (date.getDay()) {
            case 0:
                day = 'sunday'
                break;
            case 1:
                day = 'monday'
                break;
            case 2:
                day = 'tuesday'
                break;
            case 3:
                day = 'wednesday'
                break;
            case 4:
                day = 'thursday'
                break;
            case 5:
                day = 'friday'
                break;
            case 6:
                day = 'saturday'
                break;
        }
    }

    day = await getTemplate(day, language)

    return day + ", " + date.getDate() + "/" + (self.padNumber(date.getMonth() + 1, 2));
}

function isToday(date, plus) {
    const today = new Date()
    if (!plus) {
        plus = 0
    }

    return date.getDate() == (today.getDate() + plus) &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
}