import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode} from '../actions';
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
  
  componentDidMount(){
    // document.getElementById("root").addEventListener('click', this.handleBodyClick.bind(this), false);
  }

  handleBodyClick(e){
    this.props.dispatch(changeBackgroundMode(this.props.backgroundMode == "black" ? "white" : "black"));
  }

  componentWillReceiveProps(newProps){
    this.updateBackground(newProps);
  }

  updateBackground(newProps){
    let { backgroundMode } = newProps;

    if (backgroundMode == "black"){
      
      document.body.style.backgroundColor = "#000"; 

      _.each(document.querySelectorAll("body, div, p, span, text, a"), elem => {
        elem.style.color = "#FFF";
      });

    } else {
      
      document.body.style.backgroundColor = "#FFF";

      _.each(document.querySelectorAll("body, div, p, span, text, a"), elem => {
        elem.style.color = "#000";
      });


    }
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e){
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }

  render() {
    return (
      <section onClick={this.handleBodyClick.bind(this)}>
        <NewsfeedLoader />
        <Header />
        <div className="header-gutter"></div>
        <FontsList />
        <Description />
        <Footer />
        <FontCSSLoader />
      </section>
    );
  }
}

let mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    locale: state.locale,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(App);