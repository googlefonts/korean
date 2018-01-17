import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode, changeCurrentViewFont, changeHeaderMode } from '../actions';
import { Header, HeaderCollapsed, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader, HeaderGutter } from './';
import scrollama from 'scrollama';
import gfBadge from '@googlefonts/badge';

const Fragment = React.Fragment;

class App extends Component {
  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }


  componentWillMount(){
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.handleResize();
  }
  
  componentDidMount(){
    // document.getElementById("root").addEventListener('click', this.handleBodyClick.bind(this), false);
    gfBadge();
    this.initScroll();
  }

  handleScroll(e){
    // console.log(window.scrollTop);

    if (window.scrollY > 0) {
      this.props.dispatch(changeHeaderMode("collapsed"));
    } else {
      this.props.dispatch(changeHeaderMode("expanded"));
    }
  }

  initScroll(){

    var scroller = scrollama();

    scroller.setup({
        step: '.font-viewer',
        debug: true,
      })
        .onStepEnter(this.handleStepEnter.bind(this))
        .onStepExit(this.handleStepExit.bind(this));

  }

  handleStepEnter(e){
    this.props.dispatch(changeCurrentViewFont(e.element.dataset.id));

    // console.log("enter", e.element.dataset.id);
  }

  handleStepExit(e){
    this.props.dispatch(changeCurrentViewFont(null));
    // debugger;
    // console.log("exit", e.element.dataset.id);
  }

  handleBodyClick(e){
    // this.props.dispatch(changeBackgroundMode(this.props.backgroundMode == "black" ? "white" : "black"));
  }

  componentWillReceiveProps(newProps){
    // this.updateBackground(newProps);
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
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleResize(e){
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }

  render() {
    let { headerMode } = this.props;

    return (
      <section onClick={this.handleBodyClick.bind(this)}>
        <NewsfeedLoader />
        {
          headerMode == "expanded" ? 
          <Header /> : <HeaderCollapsed />  
        }        
        <HeaderGutter />
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
    headerMode: state.headerMode,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    locale: state.locale,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(App);