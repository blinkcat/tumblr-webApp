const tumblr = require('tumblr.js'),
    ConsumerKey = process.env.ConsumerKey,
    ConsumerSecret = process.env.ConsumerSecret,
    callbackURL = process.env.callbackURL,
    OAuth = require('oauth').OAuth //,
    // client = tumblr.createClient({
    //     consumer_key: ConsumerKey,
    //     consumer_secret: ConsumerSecret,
    //     token: 'Keq3BGNzvm5L7RtsrJU4tE3JX1gFyTZQbws0oQ0jm1NQpDIoSQ',
    //     token_secret: 'dyEGe0IMdWlgvytoTbUeGlHujA3k1FU6tdzel1MHVM0AkriBxY'
    // })

// Request-token URL   https://www.tumblr.com/oauth/request_token
// Authorize URL   https://www.tumblr.com/oauth/authorize
// Access-token URL    https://www.tumblr.com/oauth/access_token
// https://github.com/stigok/node-oauth-tumblr-example/blob/master/src/routes/oauth.js

var oa = new OAuth(
    'https://www.tumblr.com/oauth/request_token',
    'https://www.tumblr.com/oauth/access_token',
    ConsumerKey,
    ConsumerSecret,
    '1.0A',
    callbackURL,
    'HMAC-SHA1'
)

/**
 * host
 *66.6.33.193 tumblr.com
 *66.6.32.4   tumblr.co
 *66.6.32.4   api.tumblr.com
 *66.6.32.4   www.tumblr.com
 */
exports.login = function(req, res, next) {
    oa.getOAuthRequestToken(function(err, token, secret) {
        if (err) {
            next(err)
        } else {
            console.log(`token: ${token} | secret: ${secret}`)
            req.session.requestToken = token
            req.session.requestTokenSecret = secret
            res.set('Content-Type', 'text/html')
            res.status(200).send(`<a href='https://www.tumblr.com/oauth/authorize?oauth_token=${token}'>login tumblr</a>`)
        }
    })
}

exports.handleCb = function(req, res, next) {
    console.log(`oauth_token: ${req.query.oauth_token} | oauth_verifier: ${req.query.oauth_verifier}`)
    console.log(`session token: ${req.session.requestToken} | session secret: ${req.session.requestTokenSecret}`)
    if (!req.session.requestToken || !req.session.requestTokenSecret) {
        next(Error('missing session information'))
    } else {
        oa.getOAuthAccessToken(req.query.oauth_token, req.session.requestTokenSecret, req.query.oauth_verifier, function(err, token, secret) {
            if (err) {
                next(Error('getOAuthAccessToken failed'))
            } else {
                req.session.token = token
                req.secret.secret = secret
                console.log(`token: ${token} | secret: ${secret}`)
            }
        })
    }
}
