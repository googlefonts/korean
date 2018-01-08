import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

class NewsfeedLoader extends Component {
  componentDidMount(){
    axios.get("https://trends.google.com/trends/hottrends/atom/feed?pn=p23")
      .then(function (response) {
        debugger;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return null;
  }
}

let mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(NewsfeedLoader);