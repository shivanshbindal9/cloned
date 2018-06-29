import React, {Component} from 'react';

class VideoListItem extends Component {

     componentDidMount () {
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
   this.connection.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
    }

   this.connection.onmessage = (e) => {
          var data = JSON.parse(e.data);
          var message = data['url'];
    };
    
    this.handleclick = this.handleclick.bind(this);
}
  handleclick = (e) => {
console.log("onclick");

}


   render() {
   const video = this.props.video;
    const onUserSelected = this.props.onUserSelected;
    // console.log(video);    
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
    <li onClick={this.handleclick} onClick={() => {onUserSelected(video); console.log("hello");let url ='https://www.youtube.com/watch?v=' + video.id.videoId; this.connection.send(JSON.stringify({
            'url': [url],
}))}} className="list-group-item">
        <div className="video-list media">
            <div className="media-left">
                <img className="media-object" src={imageUrl} />
            </div>
            <div className="media-body">
                <div className="media-heading">{video.snippet.title}</div>
            </div>
        </div>
    </li>
    );
}
}

export default VideoListItem;
