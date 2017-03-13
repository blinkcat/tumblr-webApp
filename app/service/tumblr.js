/**
 *  tumblr client
 */

const tumblr = require('tumblr.js'),
    { CONSUMERKEY, CONSUMERSECRET } = process.env
let client = null

function createClient({ token, secret }) {
    if (!token || !secret) {
        throw new Error('token and secret must be provided!')
    }
    if (isClientReady()) {
        return client
    } else {
        client = tumblr.createClient({
            credentials: {
                consumer_key: CONSUMERKEY,
                consumer_secret: CONSUMERSECRET,
                token,
                token_secret: secret
            },
            returnPromises: true //promise 风格
        })
        return client
    }
}

function isClientReady() {
    return client != null
}

function getClient() {
    return client
}

module.exports = {
    isClientReady,
    createClient,
    getClient
}
