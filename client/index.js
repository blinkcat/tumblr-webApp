import React, { Component } from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import App from './containers/App'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'
import routes from './routes'
import 'normalize.css'
import './sass/index.scss'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
render(
    <Provider store={store}>
    	{/*<App />*/}
    	<Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
)
