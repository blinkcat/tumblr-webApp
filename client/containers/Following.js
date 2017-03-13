import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux'
import { fetchFollowing } from '../actions'
import { pageSize } from '../../config'
import browserHistory from 'react-router/lib/browserHistory'

class Following extends Component {
    constructor(props) {
        super(props)
        this.loadFollowing = this.loadFollowing.bind(this)
    }

    componentDidMount() {
        this.props.blogs.length == 0 && this.props.dispatch(fetchFollowing())
    }

    loadFollowing() {
        this.props.dispatch(fetchFollowing())
    }

    getLoadMoreBtn() {
        var isOver = this.props.isOver
        if (isOver) {
            return <RaisedButton style={{padding:0}} label="没有更多" fullWidth={true} />
        } else {
            return <RaisedButton style={{padding:0}} label="加载更多" fullWidth={true} onClick={this.loadFollowing} />
        }
    }

    static dispatchWork(store) {
        store.dispatch(fetchFollowing())
    }

    render() {
        const { blogs, isFetching, isOver } = this.props
        var loading = <div style={{textAlign:'center',position:'fixed',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><CircularProgress size={60} thickness={7} /></div>,
            loadMore = <div style = {{textAlign: 'center', maxWidth: '600px', margin: '10px auto 0' }}> {isFetching ? <CircularProgress /> : this.getLoadMoreBtn() }</div>

        return (
            <div style={{position:'relative'}}>
                {
                    isFetching && blogs.length == 0? loading
                    : 
                    <div>
                        <List style={ {paddingTop: '66px', maxWidth: '600px', margin: '0 auto'} }>
                            {                   
                                blogs.map(cur=>{
                                    return (
                                        <div key={cur.name}>
                                            <ListItem 
                                                leftAvatar={<Avatar src={`https://api.tumblr.com/v2/blog/${cur.url.replace(/http:\/\/|https:\/\/|\//g, '')}/avatar`} />} 
                                                primaryText={cur.name} 
                                                secondaryText={cur.updated} 
                                                rightIconButton={ <RaisedButton label="取消关注" />}
                                                onTouchTap={()=>{browserHistory.push(`/blog/${cur.name}`)}}
                                                />
                                            <Divider inset={true} />
                                        </div>
                                    )
                                })
                            }
                        </List> 
                        {loadMore}
                    </div>
                } 
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    const following = state.pagination.following
    return {
        blogs: following.blogs.map((cur) => {
            return state.entities.blogs[cur]
        }),
        isFetching: following.isFetching,
        isOver: following.page * pageSize >= following.total_blogs
    }
}

Following.propTypes = {
    isFetching: React.PropTypes.bool,
    blogs: React.PropTypes.arrayOf(React.PropTypes.object),
    isOver: React.PropTypes.bool
}

export default connect(mapStateToProps)(Following)
