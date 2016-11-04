import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import App from './containers/App'
import Dashboard from './containers/Dashboard'

export default (
    <Route path="/" component={App}>
    	<IndexRoute component={Dashboard} />
    	<Route path="dashboard" component={Dashboard} />
  	</Route>
)
