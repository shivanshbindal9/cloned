import React, {Component} from 'react';
import VideoDetail from './video_detail';
import ReactPlayer from 'react-player';
import Rplayer from './Rplayer';
import VideoList from './video_list';
import YTSearch from 'youtube-api-search';
import SearchBar from './search_bar';

var api = 'AIzaSyDqch5WUdG88xzLOuRJzBJE6xaMR0T2-lE';
var results = 10;


class Youtube extends Component {

constructor(props){
    super(props);


    this.videoSearch('React Tutorials');
}

 componentDidMount () {
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
   this.connection.onopen = (e) => {console.log('Youtube Socket connected Successfully')}
   this.connection.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
    }

   this.connection.onmessage = (e) => {
          var data = JSON.parse(e.data);
          var message = data['url'];
          this.setState({resultyt : message});
    };

}
   
  
 state = {
   resultyt : [],
   videos: [],
   selectedVideo: null
};
  
 videoSearch(searchTerm) {
  YTSearch({key: api, term: searchTerm}, (data) => {
    console.log(data);
      this.setState({ 
          videos: data,
          selectedVideo: data[0]
          
      });
  });

}


  handleSearch = (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById('search').value;
    let URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + api + '&maxResults=' + results + "&q=" + searchTerm;

    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
    // console.log(responseJson);
    const resultyt = responseJson.items.map(obj => "https://www.youtube.com/watch?v="+ obj.id.videoId);
    this.setState({resultyt : resultyt});
    this.connection.send(JSON.stringify({
            'url': this.state.resultyt,
        }))

    })

    .catch((error) => {
      console.error(error);
    });
    
     
}

  render() {

    console.log(this.state.resultyt);
    return (
      <div>
        I m from youtube
        <Rplayer url={this.state.resultyt[0]} playing={true} controls = {true} />
        <VideoDetail video={this.state.selectedVideo}/>
        <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
        <VideoList 
          onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
videos={this.state.videos} />
      </div> 
     );
 } 
}

export default Youtube;
