import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from '../../client/store'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import routes from '../../client/routes'
import { loadUserInfo, loadDashBoard, loadLikes } from '../../client/actions'
import { isClientReady, createClient } from '../model/tumblr'
import { refresh } from './api'

exports.index = function(req, res) {
    const store = configureStore()
    const { token, secret } = req.signedCookies
    if (!token || !secret) {
        res.redirect('/login')
    } else {
        if (!isClientReady()) {
            createClient({ token, secret })
            refresh()
        }
        global.navigator = {
            userAgent: req.headers['user-agent']
        }
        match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
            if (err) {
                res.status(500).end(`Internal Server Error ${err}`)
            } else if (redirectLocation) {
                res.redirect(redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                Promise.all([store.dispatch(loadUserInfo()), store.dispatch(loadDashBoard())])
                    .then(() => {
                        const html = renderToString(
                            <Provider store={store}>
                                <RouterContext {...renderProps} />
                            </Provider>
                        )
                        if (process.env.NODE_ENV == 'development') {
                            const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
                            res.render('test.html', {
                                title: 'tumblr-webApp',
                                html,
                                initialState: JSON.stringify(store.getState()),
                                css: assetsByChunkName.main
                                    .filter(path => path.endsWith('.css'))
                                    .map(path => `<link rel="stylesheet" href="${path}" />`)
                                    .join(''),
                                js: assetsByChunkName.main
                                    .filter(path => path.endsWith('.js'))
                                    .map(path => `<script src="${path}" /></script>`)
                                    .join('')
                            })
                        } else {
                            res.render('index.html', {
                                title: 'tumblr-webApp',
                                html,
                                initialState: JSON.stringify(store.getState())
                            })
                        }
                    }).catch((err) => {
                        res.status(500).end(`Internal Server Error ${err}`)
                    })
            } else {
                res.status(404).end('Not found');
            }
        })
    }
}
