import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import { List, ListItem } from 'material-ui/List'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionExit from 'material-ui/svg-icons/action/exit-to-app'
import Divider from 'material-ui/Divider'
import ContentCreate from 'material-ui/svg-icons/content/create'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import browserHistory from 'react-router/lib/browserHistory'
import { AppBarStyle } from '../util'

export default class TAppBar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.pushAndClose = this.pushAndClose.bind(this)
    }

    handleToggle() {
        this.setState({ open: !this.state.open })
    }

    handleClose() {
        this.setState({ open: false })
    }

    pushAndClose(url) {
        browserHistory.push(url)
        this.handleClose()
    }

    getAppBar() {
        var appBarStyle = { position: 'fixed', top: 0, left: 0 }
        switch (this.props.appbar.style) {
            case AppBarStyle.COMMON_STYLE:
                return <AppBar title="tumblr" 
                            onLeftIconButtonTouchTap={this.handleToggle} 
                            style={appBarStyle}
                        />
            case AppBarStyle.BLOG_STYLE:
                return <AppBar title="tumblr" 
                            onLeftIconButtonTouchTap={this.handleToggle}
                            onRightIconButtonTouchTap={()=>{browserHistory.goBack()}}
                            iconElementRight={<IconButton><NavigationClose /></IconButton>} 
                            style={appBarStyle}
                        />
        }
    }

    render() {
        const { following = 0, likes = 0, blogs = [{}] } = this.props
        const { name = '', description = '', url = '' } = blogs[0]
        var avatarSrc = url
        avatarSrc = avatarSrc.replace(/http:\/\/|https:\/\/|\//g, '')
        avatarSrc = avatarSrc ? `https://api.tumblr.com/v2/blog/${avatarSrc}/avatar` : ''
        return (
            <div>
                {this.getAppBar()}
                <Drawer docked = { false } width = { 250 } open = { this.state.open }
                    onRequestChange = {
                        (open) => this.setState({ open })
                    }
                >
                    <List>
                      <ListItem primaryText="首页" leftIcon={<ActionHome />} onTouchTap={()=>{this.pushAndClose('/dashboard')}} />
                      <ListItem primaryText="喜欢" leftIcon={<ActionFavorite />} rightIcon={<Badge badgeContent={likes} primary={true}/>} onTouchTap={()=>{this.pushAndClose('/likes')}} />
                      <ListItem primaryText="关注" leftIcon={<ActionNoteAdd />} rightIcon={<Badge badgeContent={following} primary={true}/>} onTouchTap={()=>{this.pushAndClose('/following')}}/>
                      <ListItem primaryText="设置" leftIcon={<ActionSettings />} />
                      <ListItem primaryText="新建帖子" leftIcon={<ContentCreate />} />
                      <ListItem primaryText="退出" leftIcon={<ActionExit />} onTouchTap={()=>{location.href='/exit'}}/>
                    </List>
                    <Divider />
                    <List>
                        <Subheader>博客</Subheader>
                        <ListItem
                            leftAvatar={<Avatar src={avatarSrc} />}
                            primaryText={name}
                            secondaryText={description}
                            onTouchTap={()=>{this.pushAndClose(`/blog/${name}`)}}
                        />
                    </List> 
                </Drawer>
            </div>
        )
    }
}
