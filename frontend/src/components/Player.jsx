import {connect} from 'react-redux';
import React, { Component } from 'react';
import {auth} from "../actions";
import Youtube from './Youtube';

class Player extends Component {

  constructor(props){
    super(props);
      this.handleclick = this.handleclick.bind(this);
}


  handleclick(e){
  e.preventDefault();
  window.location.reload();
  this.props.logout();
} 

  render(){
   return(
        <div>
         <h1> This is Player </h1>
        <div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.handleclick}>logout</a>)
        </div>
         <hr />
         <Youtube />
        </div>
   
       );
}}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);

