import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from '../../client/store'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import routes from '../../client/routes'
import { loadUserInfo, loadDashBoard, loadLikes } from '../../client/actions'
import { isClientOK, createClient } from './adapter'

exports.index = function(req, res) {
    const store = configureStore()
    const { token, secret } = req.signedCookies
    if (!token || !secret) {
        res.redirect('/login')
    } else {
        if (!isClientOK()) {
            createClient({ token, secret })
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
                const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
                console.log('assetsByChunkName', assetsByChunkName)
                Promise.all([store.dispatch(loadUserInfo()), store.dispatch(loadDashBoard())])
                    .then(() => {
                        const html = renderToString(
                            <Provider store={store}>
                                <RouterContext {...renderProps} />
                            </Provider>
                        )
                        res.render('index.html', {
                            html,
                            initialState: JSON.stringify(store.getState()),
                            // css: assetsByChunkName.main
                            //     .filter(path => path.endsWith('.css'))
                            //     .map(path => `<link rel="stylesheet" href="${path}" />`),
                            // js: assetsByChunkName.main
                            //     .filter(path => path.endsWith('.js'))
                            //     .map(path => `<script src="${path}" />`)
                            js: `<script src="${assetsByChunkName.main}"></script>`
                        })
                    }).catch((err) => {
                        res.status(500).end(`Internal Server Error ${err}`)
                    })
            } else {
                res.status(404).end('Not found');
            }
        })
    }
}
