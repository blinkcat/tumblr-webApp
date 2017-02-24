/**
 *  创建tumblr client
 */

const tumblr = require('tumblr.js'),
    { CONSUMERKEY, CONSUMERSECRET } = process.env
let client = null

function createClient({ token, secret }) {
    if (!token || !secret) {
        throw new Error('token or secret must be provided!')
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
            returnPromises: true
        })
        return client
    }
}

function isClientReady() {
    return !!client
}

function getClient() {
    return client
}

module.exports = {
    isClientReady,
    createClient,
    getClient
}
