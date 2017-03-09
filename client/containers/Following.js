import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux'
import { fetchFollowing } from '../actions'

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

    render() {
            var loading = <div style={{textAlign:'center',position:'fixed',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><CircularProgress size={60} thickness={7} /></div>,
                loadMore = <div style = {{textAlign: 'center', maxWidth: '600px', margin: '10px auto 0' }}> {this.props.isFetching ? <CircularProgress /> : <RaisedButton style={{padding:0}} label="加载更多" fullWidth={true} onClick={this.loadFollowing} /> }</div>

            return (
                <div style={{position:'relative'}}>
                {
                    this.props.isFetching && this.props.blogs.length == 0? loading
                    : 
                    <div>
                        <List style={ {paddingTop: '66px', maxWidth: '600px', margin: '0 auto'} }>
                            {                   
                                this.props.blogs.map(cur=>{
                                    return (
                                        <div key={cur.name}>
                                            <ListItem 
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
                        {loadMore}
                    </div>
                } 
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.pagination.following.blogs.map((cur) => {
            return state.entities.blogs[cur]
        }),
        isFetching: state.pagination.following.isFetching
    }
}

Following.propTypes = {
    isFetching: React.PropTypes.bool,
    blogs: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default connect(mapStateToProps)(Following)
