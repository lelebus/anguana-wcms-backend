const { twilio } = require('../config/index')
const client = require('twilio')(twilio.accountSid, twilio.authToken);

exports.sendMessage = function (receiver, text) {
    client.messages
        .create({
            from: 'whatsapp:' + twilio.phone,
            body: text,
            to: 'whatsapp:+' + receiver
        })
        .then(() => {
            return true;
        })
        .catch(e => {
            console.log(e);
            throw e;
        });
}