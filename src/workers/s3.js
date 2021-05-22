const AWS = require('aws-sdk')
const { s3 } = require('../config/index')

const server = new AWS.S3({
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey
})

exports.uploadPublic = async (bucketName, fileName, mimetype, fileContent) => {
    let params = {
        Bucket: bucketName,
        ACL: 'public-read',
        Key: fileName,
        ContentType: mimetype,
        Body: fileContent
    }

    return await server.upload(params).promise()
        .then(res => {
            console.log("Uploaded public file " + fileName + " to: " + res.Location)
            return res.Location;
        })
        .catch(e => {
            console.error(e)
            throw e;
        })
} 