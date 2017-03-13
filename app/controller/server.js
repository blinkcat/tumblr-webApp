import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from '../../client/store'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import routes from '../../client/routes'

exports.index = function(req, res, next) {
    const store = configureStore()
    global.navigator = {
        userAgent: req.headers['user-agent']
    }
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            next(err)
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            const components = renderProps.components.filter(cur => cur && cur.dispatchWork)
            Promise.all(components.map(cur => cur.dispatchWork(store, renderProps)))
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
                                .map(path => `<link rel="stylesheet" href="/${path}" />`)
                                .join(''),
                            js: assetsByChunkName.main
                                .filter(path => path.endsWith('.js'))
                                .map(path => `<script src="/${path}" /></script>`)
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
