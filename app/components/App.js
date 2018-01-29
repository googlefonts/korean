import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize, changeBackgroundMode, changeCurrentViewFont, changeHeaderMode, changeHeaderCollapsedTop } from '../actions';
import { Header, HeaderCollapsed, FontsList, Description, Footer, NewsfeedLoader, FontCSSLoader, HeaderGutter } from './';
import scrollama from 'scrollama';
import gfBadge from '@googlefonts/badge';
import { scaleLinear } from 'd3';
import 'gsap';
import paper from 'paper';

const Fragment = React.Fragment;

class App extends Component {
  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.headerTopScale = scaleLinear().domain([62, 0]).clamp(true).range([0, -62]);

    this.scroller = scrollama();
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
    this.handleScroll();
  }

  componentWillReceiveProps(newProps){
    if (newProps.currentCategory != this.props.currentCategory) {
      this.moveScroll(newProps.currentCategory);
    }
  }

  moveScroll(currentCategory){
    let headerHeight;
    if (!_.isNull(document.querySelector(".header-collapsed"))) {
      headerHeight = document.querySelector(".header-collapsed").offsetHeight;
    } else {
      headerHeight = 62;
    }
    let categoryPosTop = document.querySelector(`a[name=category-${currentCategory}]`).offsetTop;
    let offset = 20;

    TweenMax.to((document.documentElement || document.body.parentNode || document.body), 1, { ease: Power3.easeInOut, scrollTop: categoryPosTop - headerHeight - offset });
  }

  handleScroll(e){
    // console.log(window.scrollTop);
    var descTop = document.querySelector('.description').getBoundingClientRect().top;
    var scrollY = window.scrollY;
    
    // console.log("descTop: ", descTop);
    if (descTop < 62 && descTop >= 0) {
      
      this.props.dispatch(changeHeaderCollapsedTop(this.headerTopScale(descTop)));
    
    } else {

      this.props.dispatch(changeHeaderCollapsedTop(0));
      
    }

    if (descTop < 0) {

      this.props.dispatch(changeHeaderMode("black"));

    } else {

      if (scrollY < 10) {
        
        this.props.dispatch(changeHeaderMode("expanded"));

      } else if (scrollY >= 10) {
      
        this.props.dispatch(changeHeaderMode("collapsed"));
      
      } 
    }

  }

  initScroll(){
    this.scroller.setup({
        step: '.font-viewer',
        debug: true,
        // progress: true,
        offset: 0.25
      }).onStepEnter(this.handleStepEnter.bind(this))
        // .onStepProgress(this.handleStepProgress.bind(this))
        .onStepExit(this.handleStepExit.bind(this));
  }

  handleStepProgress(e){
    console.log(e);
  }

  handleStepEnter(e){
    // console.log(this.props.currentViewFont, e.element.dataset.id);
    if (this.props.currentViewFont != Number(e.element.dataset.id)) {
      this.props.dispatch(changeCurrentViewFont(e.element.dataset.id));
    }
    
    // console.log("enter", e.element.dataset.id);
  }

  handleStepExit(e){
    this.props.dispatch(changeCurrentViewFont(null));
    // debugger;
    // console.log("exit", e.element.dataset.id);
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
    this.scroller.resize();
    this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }

  render() {
    let { headerMode } = this.props;

    return (
      <section>
        <NewsfeedLoader />
        {
          headerMode == "expanded" ? 
          <Header /> : (headerMode == "collapsed" ? <HeaderCollapsed /> : null)
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
    currentCategory: state.currentCategory,
    currentViewFont: state.currentViewFont,
    locale: state.locale,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(App);