import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize } from '../actions';
import { Header, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader } from './';

const Fragment = React.Fragment;

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
      <Fragment>
        <NewsfeedLoader />
        <Header />
        <FontsList />
        <Description />
        <Footer />
        <FontCSSLoader />
      </Fragment>
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