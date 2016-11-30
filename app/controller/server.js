import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from '../../client/js/store'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import routes from '../../client/js/routes'

exports.index = function(req, res) {
    const store = configureStore()
    const initialState = store.getState()

    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const html = renderToString(
                <Provider store={store}>
    				<RouterContext {...renderProps} />
    			</Provider>
            )
            res.render('index-prod.html', {
                html,
                initialState: JSON.stringify(initialState)
            })
        } else {
            res.status(404).end('Not found');
        }
    })
}
