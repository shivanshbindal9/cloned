import React, {Component} from 'react';

var api = 'AIzaSyDqch5WUdG88xzLOuRJzBJE6xaMR0T2-lE';
var results = 10;


class Youtube extends Component {
  
 state = {
   resultyt : []
}

  handleSearch = (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById('search').value;
    let URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + api + '&maxResults=' + results + "&q=" + searchTerm;

    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
    // console.log(responseJson);
    const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+ obj.id.videoId);
    this.setState({resultyt : resultyt});
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
        <iframe width="560" height="315" src={this.state.resultyt[0]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        <input type="text" id="search" />
        <input type="submit" value="Search!" onClick={this.handleSearch} />
      </div> 
     );
 } 
}

export default Youtube;
