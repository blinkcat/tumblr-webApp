import React, { Component } from 'react'
import TCard from './TCard'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

export default class TList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const style = { 'maxWidth': '540px', margin: '4px auto 10px' },
            posts = this.props.posts
        var btnDom = this.props.isFetching ? <CircularProgress /> : <RaisedButton label="加载更多" fullWidth={true} onClick={this.props.loadDashBoard} />
        return (
            <ul>
            {
            	posts.map((post)=>{
            		return (
            			<li style={style} key={post.id}>
							<TCard post={post}/>
						</li>
            		)
            	})
            }
            <li style={{ 'maxWidth': '540px', margin: '4px auto 10px' ,textAlign:'center'}} key={0}>
            	{btnDom}
			</li>
			</ul>
        )
    }
}
