import React, {Component} from 'react';
import ReactPlayer from 'react-player'

var api = 'AIzaSyDqch5WUdG88xzLOuRJzBJE6xaMR0T2-lE';
var results = 10;


class Youtube extends Component {

 componentDidMount () {
   this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
   this.connection.onopen = (e) => {console.log('Youtube Socket connected Successfully')}
   this.connection.onmessage = (e) => {
          var data = JSON.parse(e.data);
          var message = data['url'];
          this.setState({resultyt : message});
    };

}
   
  
 state = {
   resultyt : []
};
  


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
            'url': this.state.resultyt
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
        <ReactPlayer url={this.state.resultyt[0]} playing />
        <input type="text" id="search" />
        <input type="submit" value="Search!" onClick={this.handleSearch} />
      </div> 
     );
 } 
}

export default Youtube;
