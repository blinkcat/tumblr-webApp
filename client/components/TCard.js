import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import SocialShare from 'material-ui/svg-icons/social/share'
import LikeButton from './LikeButton'
import merge from 'lodash/merge'

export default class TCard extends Component {
    constructor(props) {
        super(props)
        this.baseInfo = this.baseInfo.bind(this)
        this.getJSX = this.getJSX.bind(this)
    }

    baseInfo() {
        const curPost = this.props.post
        return {
            avatar: `https://api.tumblr.com/v2/blog/${curPost.post_url.match(/(http:\/\/|https:\/\/)(.+)\/post.*/)[2]}/avatar`,
            blog_name: curPost.blog_name,
            date: curPost.date.substring(0, curPost.date.length - 4),
            liked: curPost.liked,
            type: curPost.type,
            note_count: curPost.note_count,
            reblog_key: curPost.reblog_key,
            id: curPost.id
        }
    }

    video() {
        var curPost = this.props.post
        return (
            <div>
              <CardMedia>
                  <video controls poster={curPost.thumbnail_url} preload='none' width="100%">
                    <source src={curPost.video_url} />
                  </video>
              </CardMedia> 
              {/*<CardTitle title = "Card title"
              subtitle = "Card subtitle" />*/}
              <CardText>
                  {curPost.summary}
              </CardText>
          </div>
        )
    }

    photo() {
        var curPost = this.props.post,
            photos = curPost.photos
        return (
            <div>
              <CardMedia>
                {
                  photos.map((cur,index)=>{
                    return <img src={cur.original_size.url} key={index}/>
                  })
                }
              </CardMedia> 
              {/*<CardTitle title = "Card title"
              subtitle = "Card subtitle" />*/}
              <CardText>
                  {curPost.summary}
              </CardText>
            </div>
        )
    }

    text() {
        var curPost = this.props.post
        return (
            <div>
              <CardTitle title ={curPost.title} />
              <CardMedia>
                <div dangerouslySetInnerHTML={{__html:curPost.body}}></div>
              </CardMedia> 
            </div>
        )
    }

    getJSX() {
        switch (this.props.post.type) {
            case 'video':
                return this.video()
            case 'photo':
                return this.photo()
            case 'text':
                return this.text()
            default:
                return ''
        }
    }

    render() {
        const baseInfo = this.baseInfo()
        return (
            <Card>
              <CardHeader
                title={baseInfo.blog_name}
                subtitle={baseInfo.date}
                avatar={baseInfo.avatar}
              />
              {this.getJSX()}
              <CardActions>
                <FlatButton label={baseInfo.note_count+' 热度'} />
                <LikeButton tooltip="喜欢" style={{float:'right',width:'36px',height:'36px'}} id={baseInfo.id} reblogKey={baseInfo.reblog_key} defaultLiked={baseInfo.liked}/>
                <IconButton tooltip="分享" style={{float:'right',width:'36px',height:'36px'}}>
                  <SocialShare />
                </IconButton>
              </CardActions>
            </Card>
        )
    }
}
