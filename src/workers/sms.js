const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-3' });

exports.sendMessage = async (receiver, text) => {
    let params = {
        Message: text,
        PhoneNumber: '+' + receiver
    };

    var sns = new AWS.SNS()
    await sns.setSMSAttributes({
        attributes: {
            'DefaultSMSType': 'Transactional',
            'DefaultSenderID': 'Trettl'
        }
    }).promise()
    .catch(err => {
        console.log(err)
    })

    return sns.publish(params).promise()
        .then(() => {
            return true;
        })
        .catch(e => {
            console.log(e);
            throw e;
        });
}