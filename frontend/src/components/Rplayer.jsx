import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import { Grid, Form, Button, Image, Message } from 'semantic-ui-react';

const styles = {
root: {
 marginTop: '5%'
}
}

class Rplayer extends Component {

  constructor(props){
  super(props);
  this.handlePlay = this.handlePlay.bind(this);
  this.handleMute = this.handleMute.bind(this);
  this.setVolume  = this.setVolume.bind(this);
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
          var message2 = data['volume'];
          this.setState({play : message, mute:message1, volume : parseFloat(message2)});
          console.log(this.state.play,this.state.volume);
    };

}


  state={
   play : "true",
   mute : "true",
   volume : 0.8,

}

  handlePlay = () => {
 if(this.state.play === "true"){
    this.connection.send(JSON.stringify({
       'play': "false",
       'mute': this.state.mute,
       'volume': this.state.volume
}))
}
else
{
this.connection.send(JSON.stringify({
       'play': "true",
       'mute': this.state.mute,
       'volume': this.state.volume

}))
}
}

 handleMute = () => {
 if(this.state.mute === "true"){
    this.connection.send(JSON.stringify({
       'play': this.state.play,
       'mute': "false",
       'volume': this.state.volume
}))
}
else
{
this.connection.send(JSON.stringify({
       'play': this.state.play,
       'mute': "true",
       'volume': this.state.volume

}))
}
}

setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
	     this.connection.send(JSON.stringify({'play':this.state.play,'mute': this.state.mute,'volume': parseFloat(e.target.value) }));

}


  render(){
    return(
       <div>
        <Grid centered style={styles.root} textAlign='center'>
            <Grid.Column width={6}>
         <ReactPlayer url={this.props.url} width="100%" playing={this.state.play==="true"} muted={this.state.mute === 'false'}  volume={this.state.volume}/>
         <button onClick = {this.handlePlay}> {this.state.play==="true" ? 'pause' : 'play'} </button>
         <button onClick = {this.handleMute}> {this.state.mute === 'false' ? 'unmute' : 'mute'} </button>
         <input type='range' min={0} max={1} step='ny' value={this.state.volume} onChange={this.setVolume} />
       </Grid.Column>
          </Grid>
       </div>
      );
}
}

export default Rplayer;
