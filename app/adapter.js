// Adapter
// https://github.com/stigok/node-oauth-tumblr-example/blob/master/src/routes/oauth.js
const tumblr = require('tumblr.js'),
    ConsumerKey = process.env.ConsumerKey,
    ConsumerSecret = process.env.ConsumerSecret,
    callbackURL = '',
    OAuth = require('oauth').OAuth,
    client = tumblr.createClient({
        consumer_key: ConsumerKey,
        consumer_secret: ConsumerSecret,
        token: 'Keq3BGNzvm5L7RtsrJU4tE3JX1gFyTZQbws0oQ0jm1NQpDIoSQ',
        token_secret: 'dyEGe0IMdWlgvytoTbUeGlHujA3k1FU6tdzel1MHVM0AkriBxY'
    })

var oa = new OAuth(
    'https://www.tumblr.com/oauth/request_token',
    'https://www.tumblr.com/oauth/access_token',
    ConsumerKey,
    ConsumerSecret,
    '1.0A',
    callbackURL,
    'HMAC-SHA1'
)

oa.getOAuthRequestToken(function(error, oAuthToken, oAuthTokenSecret, results) {
    var urlObj = nodeUrl.parse(request.url, true);
    var authURL = 'https://www.tumblr.com/oauth/authorize?oauth_token=' + oAuthToken;
    var handlers = {
        '/': function(request, response) {
            /**
             * Creating an anchor with authURL as href and sending as response
             */
            var body = '<a href="' + authURL + '"> Get Code </a>';
            response.writeHead(200, {
                'Content-Length': body.length,
                'Content-Type': 'text/html'
            });
            response.end(body);
        },
        '/callback': function(request, response) {
            /** Obtaining access_token */
            var getOAuthRequestTokenCallback = function(error, oAuthAccessToken,
                oAuthAccessTokenSecret, results) {
                if (error) {
                    console.log(error);
                    response.end(JSON.stringify({
                        message: 'Error occured while getting access token',
                        error: error
                    }));
                    return;
                }
            };

            oa.getOAuthAccessToken(urlObj.query.oauth_token, oAuthTokenSecret,
                urlObj.query.oauth_verifier,
                getOAuthRequestTokenCallback);

        }
    };
    handlers[urlObj.pathname](request, response);
})
