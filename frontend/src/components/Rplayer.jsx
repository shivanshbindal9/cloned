import React, {Component} from 'react';
import ReactPlayer from 'react-player'

class Rplayer extends Component {

  constructor(props){
  super(props);
  this.handlePlay = this.handlePlay.bind(this);
  this.handleMute = this.handleMute.bind(this);
}

  componentDidMount () {
   this.connection = new WebSocket('ws://localhost:8000/ws/controls/');
   this.connection.onopen = (e) => {console.log('Volume Socket connected Successfully')}
   this.connection.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
    }

   this.connection.onmessage = (e) => {
          var data = JSON.parse(e.data);
          var message = data['play'];
          var message1 = data['mute'];
          this.setState({play : message, mute:message1});
          console.log(this.state.play);
    };

}


  state={
   play : "true",
   mute : "true",

}

  handlePlay = () => {
 if(this.state.play === "true"){
    this.connection.send(JSON.stringify({
       'play': "false",
       'mute': this.state.mute
}))
}
else
{
this.connection.send(JSON.stringify({
       'play': "true",
       'mute': this.state.mute

}))
}
}

 handleMute = () => {
 if(this.state.mute === "true"){
    this.connection.send(JSON.stringify({
       'play': this.state.play,
       'mute': "false"
}))
}
else
{
this.connection.send(JSON.stringify({
       'play': this.state.play,
       'mute': "true"

}))
}
}




  render(){
    return(
       <div>
         <ReactPlayer url={this.props.url} playing={this.state.play==="true"} muted={this.state.mute === 'false'}  />
         <button onClick = {this.handlePlay}> Play/Pause </button>
         <button onClick = {this.handleMute}> mute/unmute </button>
       </div>
      );
}
}

export default Rplayer;
