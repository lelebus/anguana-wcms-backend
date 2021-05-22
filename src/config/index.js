const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    environment: process.env.NODE_ENV,

    port: process.env.PORT,
    path: process.env.GRAPHQL_PATH,

    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    database: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    s3: {
        accessKeyId: process.env.S3_ID,
        secretAccessKey: process.env.S3_SECRET
    },
    twilio: {
        accountSid: process.env.TWILIO_ID,
        authToken: process.env.TWILIO_AUTH,
        phone: process.env.TWILIO_PHONE
    }
}