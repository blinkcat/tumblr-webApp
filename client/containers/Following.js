import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux'
import { loadFollowing } from '../actions'

class Following extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.blogs.length == 0 && this.props.loadFollowing()
    }

    render() {
        return (
            <div style={{position:'relative'}}>
        		{this.props.isFetching && this.props.blogs.length == 0 && <div style={{textAlign:'center',position:'fixed',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><CircularProgress size={60} thickness={7} /></div>}
	            <List style={ {paddingTop: '66px', maxWidth: '600px', margin: '0 auto'} }>
	            	{            		
	            		this.props.blogs.map(cur=>{
	            			return (
								<div>
		            			<ListItem key={cur.name} 
			            			leftAvatar={<Avatar src={`https://api.tumblr.com/v2/blog/${cur.url.replace(/http:\/\/|https:\/\/|\//g, '')}/avatar`} />} 
			            			primaryText={cur.name} 
			            			secondaryText={cur.updated} 
									rightIconButton={ <RaisedButton label="取消关注" />}
			            			/>
			            		<Divider inset={true} />
			            		</div>
		            		)
	            		})
	            	}
	            </List>
	            <div style={{textAlign:'center',maxWidth:'600px',margin:'0 auto'}}>
					{this.props.isFetching ? <CircularProgress /> : <RaisedButton style={{padding:0}} label="加载更多" fullWidth={true} onClick={this.props.loadFollowing} />}
				</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.pagination.following.blogs.map((cur) => {
            return state.entities.blogs[cur]
        }),
        isFetching: state.pagination.following.isFetching
    }
}

export default connect(mapStateToProps, {
    loadFollowing
})(Following)
