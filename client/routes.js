import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Likes from './containers/Likes'
import Following from './containers/Following'
import TBlog from './containers/TBlog'

export default (
    <Route path="/" component={App}>
    	<IndexRoute component={Dashboard} />
    	<Route path="dashboard" component={Dashboard} />
    	<Route path="likes" component={Likes} />
    	<Route path="following" component={Following} />
    	<Route path="blog/:blog_name" component={TBlog} />
  	</Route>
)
