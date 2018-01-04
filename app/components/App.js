import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize } from '../actions';

class App extends Component {
  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount(){
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e){
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }

  render() {
    return (
      <div>
        Google Fonts + Korean Early Access
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight
  }
}

export default connect(mapStateToProps)(App);