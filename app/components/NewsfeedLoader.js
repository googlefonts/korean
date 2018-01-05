import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class NewsfeedLoader extends Component {
  componentDidMount(){

  }

  render() {
    return null;
  }
}

let mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(NewsfeedLoader);