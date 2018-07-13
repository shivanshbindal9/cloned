import {connect} from 'react-redux';
import React, { Component } from 'react';
import {auth} from "../actions";
import Youtube from './Youtube';
import { Menu } from 'semantic-ui-react';
import playerimg from '../images/playerimg.jpg';
import './styles.css';

class Player extends Component {

  constructor(props){
    super(props);
      this.handleclick = this.handleclick.bind(this);
}


  handleclick(e){
  e.preventDefault();
  this.props.logout();
  //  window.location.reload();
} 

  render(){
   return(
        <div>
        <Menu fluid fixed="top">
        <Menu.Menu>
        <Menu.Item>
        <div> This is Player </div>   <img src = {playerimg} className="NavBar-logo" /> 
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        <Menu.Item >
          {this.props.user.username} (<a onClick={this.handleclick}>logout</a>)
        </Menu.Item>
        </Menu.Menu>
        </Menu>
         
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

