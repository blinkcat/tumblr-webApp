import React, { Component } from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import App from './containers/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'normalize.css'
import '../sass/index.scss'

injectTapEventPlugin()

const store = configureStore()
render(
    <Provider store={store}>
    	<App />
    </Provider>,
    document.getElementById('app')
)
