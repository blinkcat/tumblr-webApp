import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import { List, ListItem } from 'material-ui/List'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Divider from 'material-ui/Divider'
import ContentCreate from 'material-ui/svg-icons/content/create'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Badge from 'material-ui/Badge'
import browserHistory from 'react-router/lib/browserHistory'

export default class TAppBar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleToggle() { this.setState({ open: !this.state.open }) }

    handleClose() { this.setState({ open: false }) }

    render() {
        const { following = 0, likes = 0, blogs = [{}] } = this.props
        const { name = '', description = '', url = '' } = blogs[0]
        var avatarSrc = url
        avatarSrc = avatarSrc.replace(/http:\/\/|https:\/\/|\//g, '')
        avatarSrc = avatarSrc ? `https://api.tumblr.com/v2/blog/${avatarSrc}/avatar` : ''
        return (
            <div>
                <AppBar title="tumblr" onLeftIconButtonTouchTap={this.handleToggle} style={{position:'fixed',top:0,left:0}}/>
                <Drawer docked = { false } width = { 250 } open = { this.state.open }
                    onRequestChange = {
                        (open) => this.setState({ open })
                    }
                >
                    <List>
                      <ListItem primaryText="首页" leftIcon={<ActionHome />} onClick={()=>{browserHistory.push('/dashboard')}} />
                      <ListItem primaryText="喜欢" leftIcon={<ActionFavorite />} rightIcon={<Badge badgeContent={likes} primary={true}/>} onClick={()=>{browserHistory.push('/likes')}} />
                      <ListItem primaryText="关注" leftIcon={<ActionNoteAdd />} rightIcon={<Badge badgeContent={following} primary={true}/>} />
                      <ListItem primaryText="设置" leftIcon={<ActionSettings />} />
                      <ListItem primaryText="新建帖子" leftIcon={<ContentCreate />} />
                    </List>
                    <Divider />
                    <List>
                        <Subheader>博客</Subheader>
                        <ListItem
                            leftAvatar={<Avatar src={avatarSrc} />}
                            primaryText={name}
                            secondaryText={description}
                        />
                    </List> 
                </Drawer>
            </div>
        )
    }
}
